import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FreeBoard } from '../../../types/report/ReportType';
import { RootState } from '../store';
import { getFreeBoardAll } from './freeBoardApis';

export interface FreeBoardProps {
  loading: boolean;
  freeBoardList: Array<FreeBoard>;
}

const initialState: FreeBoardProps = {
  loading: false,
  freeBoardList: [],
};

export const freeBoardSlice = createSlice({
  name: 'freeBoard',
  initialState,
  reducers: {
    getFreeBoard: (state) => {
      state.loading = true;
    },
    getFreeBoardSuccess: (state, action: PayloadAction<Array<FreeBoard>>) => {
      state.freeBoardList = [];
      state.freeBoardList = action.payload;
      state.loading = false;
    },
    getFreeBoardFailure: (state) => {
      state.loading = false;
    },
  },
});

export const { getFreeBoard, getFreeBoardSuccess, getFreeBoardFailure } =
  freeBoardSlice.actions;

export const selectFreeBoard = (state: RootState) => state.freeBoard;

export default freeBoardSlice.reducer;

export function fetchFreeBoard(sorted: string = 'modifiedDate') {
  return async (dispatch: any) => {
    dispatch(getFreeBoard());
    try {
      const freeBoardList = await getFreeBoardAll(sorted);
      if (freeBoardList.length === 0) {
        alert('게시글이 없습니다!');
      } else {
        dispatch(getFreeBoardSuccess(freeBoardList));
      }
    } catch (err) {
      dispatch(getFreeBoardFailure());
    }
  };
}
