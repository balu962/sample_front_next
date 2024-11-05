import path from 'path';

export default {
  entry: './src/app/scripts/getClientInfo.ts',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.mts'],
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve('dist'),
  },
};
