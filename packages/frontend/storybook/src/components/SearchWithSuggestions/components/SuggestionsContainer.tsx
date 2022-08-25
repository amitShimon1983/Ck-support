import React, { forwardRef, ReactElement } from 'react';
import { FocusZone, Callout, DirectionalHint } from '@fluentui/react';

export interface SuggestionsContainerProps {
  width?: number;
  hidden: boolean;
  onDismiss?: () => void;
  children: ReactElement;
}

const SuggestionsContainer = forwardRef(
  ({ hidden, onDismiss, children, width }: SuggestionsContainerProps, ref: any) => {
    return (
      <FocusZone disabled={true}>
        <Callout
          id="SuggestionContainer"
          ariaLabelledBy={'callout-suggestions'}
          gapSpace={2}
          coverTarget={false}
          preventDismissOnScroll={true}
          preventDismissOnResize={true}
          alignTargetEdge={true}
          directionalHint={DirectionalHint.bottomLeftEdge}
          onDismiss={() => {
            onDismiss?.();
          }}
          hidden={hidden}
          calloutMaxHeight={320}
          calloutWidth={width}
          target={ref?.current}
          shouldUpdateWhenHidden={false}
          isBeakVisible={false}
        >
          {children}
        </Callout>
      </FocusZone>
    );
  }
);

export default SuggestionsContainer;
