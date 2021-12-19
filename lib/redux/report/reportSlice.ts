import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { ChartReport } from '../../../types/report/ReportType';
import {
  checkIdByNickname,
  getReportAll,
  getReportByCompanyName,
  getSearchReportAll,
  getUserReportAll,
} from './reportApis';

export interface ReportListProps {
  loading: boolean;
  reportList: Array<ChartReport>;
  isWriter: boolean;
}

const initialState: ReportListProps = {
  loading: false,
  reportList: [],
  isWriter: false,
};
export const reportSlice = createSlice({
  name: 'report',
  initialState,
  reducers: {
    // 전체 리스트 조회
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

    // my page 유저 리스트 조회
    getUserReport: (state) => {
      state.loading = true;
    },
    getUserReportSuccess: (
      state,
      action: PayloadAction<Array<ChartReport>>,
    ) => {
      state.reportList = [];
      state.reportList = action.payload;
      state.loading = false;
    },
    getUserReportFailure: (state) => {
      state.loading = false;
    },

    // 검색 기반 리스트 조회
    getSearchReport: (state) => {
      state.loading = true;
    },
    getSearchReportSuccess: (
      state,
      action: PayloadAction<Array<ChartReport>>,
    ) => {
      state.reportList = [];
      state.reportList = action.payload;
      state.loading = false;
    },
    getSearchReportFailure: (state) => {
      state.loading = false;
    },

    setIsWriterTrue: (state) => {
      state.isWriter = true;
    },
    setIsWriterFalse: (state) => {
      state.isWriter = false;
    },
  },
});

export const {
  getReport,
  getReportSuccess,
  getReportFailure,
  getUserReport,
  getUserReportSuccess,
  getUserReportFailure,
  getSearchReport,
  getSearchReportSuccess,
  getSearchReportFailure,
  setIsWriterTrue,
  setIsWriterFalse,
} = reportSlice.actions;
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
        const reportList = await getReportAll(sorted);
        if (reportList.length === 0) {
          alert('게시글이 없습니다!');
        } else {
          dispatch(getReportSuccess(reportList));
        }
      } else {
        const reportList = await getReportByCompanyName(companyName, sorted);
        if (reportList.length === 0) {
          alert('게시글이 없습니다!');
          dispatch(getReportFailure());
        } else {
          dispatch(getReportSuccess(reportList));
        }
      }
    } catch (error) {
      dispatch(getReportFailure());
    }
  };
}

export function fetchUserReport(userId: number) {
  return async (dispatch: any) => {
    dispatch(getUserReport());
    try {
      const reportList = await getUserReportAll(userId);
      if (reportList.length === 0) {
        alert('게시글이 없습니다!');
        dispatch(getUserReportFailure());
      } else {
        dispatch(getUserReportSuccess(reportList));
      }
    } catch (error) {
      dispatch(getUserReportFailure());
    }
  };
}

export function fetchSearchReport(
  column: string,
  value: string,
  sorted: string = 'modifiedDate',
) {
  return async (dispatch: any) => {
    dispatch(getSearchReport());
    try {
      const reportList = await getSearchReportAll(
        'chart',
        column,
        value,
        sorted,
      );
      if (reportList.length === 0) {
        alert('게시글이 없습니다!');
        dispatch(getSearchReportFailure());
      } else {
        dispatch(getSearchReportSuccess(reportList));
      }
    } catch (error) {
      dispatch(getSearchReportFailure());
    }
  };
}

export function userIdCheck(id: number, nickname: string) {
  return async (dispatch: any) => {
    try {
      const checkId = await checkIdByNickname(nickname);
      if (id === checkId) {
        dispatch(setIsWriterTrue());
      } else {
        dispatch(setIsWriterFalse());
      }
    } catch (error) {
      dispatch(setIsWriterFalse());
    }
  };
}
