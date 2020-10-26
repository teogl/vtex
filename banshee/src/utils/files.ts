import * as R from 'ramda';
import * as glob from 'glob';

const choosePrototype = R.ifElse(
  R.has('default'),
  R.prop('default'),
  R.converge(R.prop, [R.compose(R.head, R.keys), R.identity]),
);

export const getPrototypes = <T = any>(path: string): T[] =>
  glob.sync(path).map<T>(R.compose(choosePrototype, require));
