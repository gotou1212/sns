import { createContext, useContext, useMemo, useState } from 'react';

const PostModalContext = createContext(null);

export const PostModalProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [postVersion, setPostVersion] = useState(0);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);
  const notifyPosted = () => setPostVersion((value) => value + 1);

  const value = useMemo(
    () => ({
      isOpen,
      openModal,
      closeModal,
      postVersion,
      notifyPosted,
    }),
    [isOpen, postVersion],
  );

  return <PostModalContext.Provider value={value}>{children}</PostModalContext.Provider>;
};

export const usePostModal = () => {
  const context = useContext(PostModalContext);
  if (!context) {
    throw new Error('usePostModal must be used within a PostModalProvider');
  }
  return context;
};
