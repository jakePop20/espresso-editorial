import type {Route} from './+types/_index';
import {Homepage} from '~/components/homepage/Homepage';

export const meta: Route.MetaFunction = () => {
  return [{title: 'Espresso Editorial | The Art of Slow Coffee'}];
};

export default function HomepageRoute() {
  return <Homepage />;
}
