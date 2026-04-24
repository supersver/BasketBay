import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SpinnerGap } from "phosphor-react";
import React from "react";
import { ErrorBoundary } from "react-error-boundary";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";

const ErrorFallback = ({ error }: { error: any }) => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div role="alert" className="p-4 bg-red-100 text-red-800 rounded">
        <p className="font-bold">Something went wrong:</p>
        <pre className="mt-2 text-sm">{error.message}</pre>
      </div>
    </div>
  );
};

const queryClient = new QueryClient();

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <React.Suspense
      fallback={<SpinnerGap size={40} className="animate-spin" />}
    >
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <QueryClientProvider client={queryClient}>
          <ToastContainer />

          <BrowserRouter>{children}</BrowserRouter>
        </QueryClientProvider>
      </ErrorBoundary>
    </React.Suspense>
  );
};
