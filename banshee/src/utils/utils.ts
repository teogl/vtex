import * as R from 'ramda';
import { ObjectId } from 'mongodb';
import { Exception } from '../core/exceptions/exception';
import { PaginatedResultDto } from 'src/core/dtos/paginated-result.dto';

export const isEmptyOrNil = R.either(R.isEmpty, R.isNil);
export const isNotEmptyOrNil = R.compose(R.not, isEmptyOrNil);

export const throwError = (exception: Exception) => () => {
  throw exception;
};

export const throwErrorIfEmptyOrNil = (exception: Exception) =>
  R.ifElse(isEmptyOrNil, throwError(exception), R.identity);

export const throwErrorIfNotEmptyOrNil = (exception: Exception) =>
  R.ifElse(isNotEmptyOrNil, throwError(exception), R.identity);

export const objectToString = (id: ObjectId) => new ObjectId(id).toHexString();

export const transformSingleObjectToString = R.evolve({
  id: objectToString
})

export const transformIdToString = R.map(
  R.evolve({
    id: objectToString
  })
)

export const toPaginationResponse: <T>() => PaginatedResultDto<T> = R.applySpec<PaginatedResultDto<any>>({
  data: R.compose(transformIdToString, R.nth(0)),
  total: R.nth(1)
});