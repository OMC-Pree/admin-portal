/* eslint-disable @typescript-eslint/no-explicit-any */

import { render as rtlRender, RenderResult } from "@testing-library/react";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { rootReducer } from "../app/store";
import { idpApi } from "../api/idpApi";
import { MemoryRouter } from "react-router-dom";

function render(ui: React.ReactElement, options: any = {}, route?: string): RenderResult {
  const {
    store = configureStore({
      reducer: rootReducer,
      middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
          immutableCheck: {
            warnAfter: 150,
          },
          serializableCheck: {
            warnAfter: 150,
          },
        }).concat(idpApi.middleware),
      preloadedState: options.preloadedState,
    }),
    ...renderOptions
  } = options;
  function Wrapper({ children }: any) {
    return (
      <Provider store={store}>
        <MemoryRouter initialEntries={route ? [route] : undefined}>{children}</MemoryRouter>
      </Provider>
    );
  }
  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
}

// re-export everything
export * from "@testing-library/react"; // override render method
export { render };
