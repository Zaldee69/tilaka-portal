'use client';

import { Dispatch, SetStateAction, createContext } from 'react';
import { useMemo, useState } from 'react';

type TinitialState = {
  isOpen: boolean;
  confirmationType?: 'fr' | 'liveness';
};

export type TcontextValue = {
  callbacks?: { [key: string | number]: () => void }; // functions that wrapped by useCallback
  state: TinitialState; // main state of context
  stateSetter: Dispatch<SetStateAction<TinitialState>>; // main stateSetter of context
};

const initialState: TinitialState = { isOpen: false, confirmationType: 'fr' };

const contextValueDefault: TcontextValue = {
  state: { isOpen: false },
  stateSetter: () => false
};

export const TnCContext = createContext(contextValueDefault);

type Props = { children: React.ReactNode | JSX.Element };

export const TnCContextProvider = (props: Props) => {
  const [state, stateSetter] = useState(initialState);

  const memoizedValue = useMemo(
    (): TcontextValue => ({
      callbacks: {},
      state,
      stateSetter
    }),
    [state]
  );

  return (
    <TnCContext.Provider value={memoizedValue}>
      {props.children}
    </TnCContext.Provider>
  );
};
