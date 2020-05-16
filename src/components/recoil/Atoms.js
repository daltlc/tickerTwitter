import { atom } from 'recoil';

//Using Facebook's new Recoil state management
export const selectedTabState = atom({
	key: 'selectedTabState', // unique ID (with respect to other atoms/selectors)
	default: [ 'All', '' ] // default value (aka initial value)
});
