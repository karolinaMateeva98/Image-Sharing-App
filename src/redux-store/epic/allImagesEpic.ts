import { catchError, from, map, mergeMap, of } from 'rxjs';
import { ofType } from 'redux-observable';
// import FakeBackendService from '../../service/FakeBackendService';
import {
  getAllImagesFailedAction,
  getAllImagesSuccessAction,
  getAllImagesRequestAction
} from '../reducer/allImagesSlice';

export const allImagesRequestEpic = (acntio$: any, state$: any) => {
  // return action$.pipe(
  //   ofType(getAllImagesRequestAction),
  //   mergeMap((action: any) =>
  //     from(FakeBackendService.getAllImages()).pipe(
  //       map((response: any) => {
  //         if (response.data) {
  //           return getAllImagesSuccessAction(response.data);
  //         } else {
  //           throw response;
  //         }
  //       }),
  //       catchError((err) => {
  //         let result = {
  //           message: err
  //         };
  //         return of(getAllImagesFailedAction(result));
  //       })
  //     )
  //   )
  // );
};
