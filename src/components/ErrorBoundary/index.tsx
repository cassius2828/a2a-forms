import React, { ErrorInfo, ReactNode } from "react";

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    // Update state so the next render shows the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    // You can also log the error to an error reporting service
    console.error("Error caught by ErrorBoundary: ", error, errorInfo);
  }

  render(): ReactNode {
    if (this.state.hasError) {
      // Render the fallback UI
      return (
        <div className="p-4 bg-neutral-950 text-gray-100 w-screen h-screen mt-52">
          <div className="w-full text-center">
            <h1 className="text-4xl md:text-8xl">Something went wrong.</h1>
            <p className="text-xl md:text-2xl">
              We're sorry, but an unexpected error has occurred.
            </p>
            <br />
            <p className="text-xl md:text-2xl">
              Please try refreshing the page or visiting another path.
            </p>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
