import { Component } from "react";
import "./ComponentErrorBoundary.css";

class ComponentErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error(
      `Error boundary caught a failure in ${this.props.componentName}.`,
      error,
      errorInfo,
    );
  }

  componentDidUpdate(prevProps) {
    const resetKeys = this.props.resetKeys ?? [];
    const previousResetKeys = prevProps.resetKeys ?? [];
    const shouldReset =
      this.state.hasError &&
      resetKeys.length === previousResetKeys.length &&
      resetKeys.some((key, index) => key !== previousResetKeys[index]);

    if (shouldReset) {
      this.setState({ hasError: false });
    }
  }

  handleRetry = () => {
    this.setState({ hasError: false });
  };

  render() {
    if (this.state.hasError) {
      return (
        <section
          className={`component-error-boundary ${this.props.className ?? ""}`}
        >
          <div className="component-error-boundary__content">
            <p className="component-error-boundary__eyebrow">
              {this.props.componentName} unavailable
            </p>
            <h2>{this.props.title ?? "Something went wrong in this section."}</h2>
            <p>
              {this.props.message ??
                "Try again to reload this part of the page without losing the rest of your work."}
            </p>
            <button
              type="button"
              className="secondary"
              onClick={this.handleRetry}
            >
              Retry
            </button>
          </div>
        </section>
      );
    }

    return this.props.children;
  }
}

export default ComponentErrorBoundary;
