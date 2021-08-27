import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { BulletinBoard } from '../../../types/report/ReportType';
import { RootState } from '../store';
import { getBulletinBoardAll } from './bulletinBoardApis';

export interface BulletinBoardProps {
  loading: boolean;
  bulletinBoardList: Array<BulletinBoard>;
}

const initialState: BulletinBoardProps = {
  loading: false,
  bulletinBoardList: [],
};

export const BulletinBoardSlice = createSlice({
  name: 'bulletinBoard',
  initialState,
  reducers: {
    getBulletinBoard: (state) => {
      state.loading = true;
    },
    getBulletinBoardSuccess: (
      state,
      action: PayloadAction<Array<BulletinBoard>>,
    ) => {
      state.bulletinBoardList = [];
      state.bulletinBoardList = action.payload;
      state.loading = false;
    },
    getBulletinBoardFailure: (state) => {
      state.loading = false;
    },
  },
});

export const {
  getBulletinBoard,
  getBulletinBoardSuccess,
  getBulletinBoardFailure,
} = BulletinBoardSlice.actions;

export const selectBulletinBoard = (state: RootState) => state.bulletinBoard;

export default BulletinBoardSlice.reducer;

export function fetchBulletinBoard(sorted: string = 'modifiedDate') {
  return async (dispatch: any) => {
    dispatch(getBulletinBoard());
    try {
      const bulletinBoardList = await getBulletinBoardAll(sorted);
      if (bulletinBoardList.length === 0) {
        alert('게시글이 없습니다!');
      } else {
        dispatch(getBulletinBoardSuccess(bulletinBoardList));
      }
    } catch (err) {
      dispatch(getBulletinBoardFailure());
    }
  };
}
