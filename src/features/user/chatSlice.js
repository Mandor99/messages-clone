import { createSlice } from '@reduxjs/toolkit';

export const chatSlice = createSlice({
	name: 'chat',
	initialState: {
		chatId: null,
		chatName: null,
	},
	reducers: {
		userChat: (state, action) => {
			state.chatId = action.payload.chatId;
			state.chatName = action.payload.chatName;
		},
	},
});

const { actions, reducer } = chatSlice;
export const { userChat } = actions;
export const selectChatId = (state) => state.chat.chatId;
export const selectChatName = (state) => state.chat.chatName;
export default reducer; //for store as chatReducer
