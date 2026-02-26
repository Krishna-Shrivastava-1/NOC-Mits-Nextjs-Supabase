import { create } from 'zustand';

const useMyStore = create((set) => ({
  // The string state
  role: 'teacher',

  // Action to update it
  setRole: (newrole) => set({ role: newrole }),
}));

export default useMyStore;
