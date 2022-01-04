import '@testing-library/jest-dom';
import 'mutationobserver-shim';
import { configure } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

configure({ adapter: new Adapter() });

jest.mock('i18next', () => ({
  t: (key: string, params: Record<string, string>) => (params ? `${key} ${JSON.stringify(params)}` : key)
}));
