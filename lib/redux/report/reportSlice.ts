import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { ChartReport } from '../../../types/report/ReportType';
import { getReportAll, getReportByCompanyName } from './reportApis';

export interface ReportListProps {
  loading: boolean;
  reportList: Array<ChartReport>;
}

const initialState: ReportListProps = {
  loading: false,
  reportList: [],
};
export const reportSlice = createSlice({
  name: 'report',
  initialState,
  reducers: {
    getReport: (state) => {
      state.loading = true;
    },
    getReportSuccess: (state, action: PayloadAction<Array<ChartReport>>) => {
      state.reportList = [];
      state.reportList = action.payload;
      state.loading = false;
    },
    getReportFailure: (state) => {
      state.loading = false;
    },
  },
});

export const { getReport, getReportSuccess, getReportFailure } =
  reportSlice.actions;
export const selectReport = (state: RootState) => state.report;

export default reportSlice.reducer;

export function fetchReport(
  companyName: string,
  sorted: string = 'modifiedDate',
) {
  return async (dispatch: any) => {
    dispatch(getReport());
    try {
      if (companyName === '전체' || companyName === null) {
        const report = await getReportAll(sorted);
        dispatch(getReportSuccess(report));
      } else {
        const report = await getReportByCompanyName(companyName, sorted);
        dispatch(getReportSuccess(report));
      }
    } catch (error) {
      dispatch(getReportFailure());
    }
  };
}
