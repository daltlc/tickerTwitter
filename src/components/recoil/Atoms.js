import { atom } from 'recoil';

//Using Facebook's new Recoil state management
export const tabItemCount = atom({
	key: 'tabItemCount', // unique ID (with respect to other atoms/selectors)
	default: [ 'All', '' ] // default value (aka initial value)
});
