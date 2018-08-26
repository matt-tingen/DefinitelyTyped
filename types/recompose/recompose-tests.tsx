import * as React from "react";
import {
    // Higher-order components
    mapProps, withProps, withPropsOnChange, withHandlers,
    defaultProps, renameProp, renameProps, flattenProp,
    withState, withReducer, branch, renderComponent,
    renderNothing, shouldUpdate, pure, onlyUpdateForKeys,
    onlyUpdateForPropTypes, withContext, getContext,
    lifecycle, toClass, withStateHandlers,
    // Static property helpers
    setStatic, setPropTypes, setDisplayName,
    // Utilities
    compose, getDisplayName, wrapDisplayName, shallowEqual,
    isClassComponent, createEagerElement, createEagerFactory,
    createSink, componentFromProp, nest, hoistStatics,
    // Observable utilities
    componentFromStream, mapPropsStream, createEventHandler,
    createEventHandlerWithConfig,
    componentFromStreamWithConfig, mapPropsStreamWithConfig,
    setObservableConfig,
    StateHandler,
    StateHandlerMap,
} from "recompose";
import rxjsconfig from "recompose/rxjsObservableConfig";
import rxjs4config from "recompose/rxjs4ObservableConfig";
import mostConfig from "recompose/mostObservableConfig";
import xstreamConfig from "recompose/xstreamObservableConfig";
import baconConfig from "recompose/baconObservableConfig";
import kefirConfig from "recompose/kefirObservableConfig";

import mapPropsStandalone from "recompose/mapProps";
import withPropsStandalone from "recompose/withProps";
import withPropsOnChangeStandalone from "recompose/withPropsOnChange";
import withHandlersStandalone from "recompose/withHandlers";
import defaultPropsStandalone from "recompose/defaultProps";
import renamePropStandalone from "recompose/renameProp";
import renamePropsStandalone from "recompose/renameProps";
import flattenPropStandalone from "recompose/flattenProp";
import withStateStandalone from "recompose/withState";
import withStateHandlersStandalone from "recompose/withStateHandlers";
import withReducerStandalone from "recompose/withReducer";
import branchStandalone from "recompose/branch";
import renderComponentStandalone from "recompose/renderComponent";
import renderNothingStandalone from "recompose/renderNothing";
import shouldUpdateStandalone from "recompose/shouldUpdate";
import pureStandalone from "recompose/pure";
import onlyUpdateForKeysStandalone from "recompose/onlyUpdateForKeys";
import onlyUpdateForPropTypesStandalone from "recompose/onlyUpdateForPropTypes";
import withContextStandalone from "recompose/withContext";
import getContextStandalone from "recompose/getContext";
import lifecycleStandalone from "recompose/lifecycle";
import toClassStandalone from "recompose/toClass";
import setStaticStandalone from "recompose/setStatic";
import setPropTypesStandalone from "recompose/setPropTypes";
import setDisplayNameStandalone from "recompose/setDisplayName";
import composeStandalone from "recompose/compose";
import getDisplayNameStandalone from "recompose/getDisplayName";
import wrapDisplayNameStandalone from "recompose/wrapDisplayName";
import shallowEqualStandalone from "recompose/shallowEqual";
import isClassComponentStandalone from "recompose/isClassComponent";
import createSinkStandalone from "recompose/createSink";
import componentFromPropStandalone from "recompose/componentFromProp";
import nestStandalone from "recompose/nest";
import hoistStaticsStandalone from "recompose/hoistStatics";
import componentFromStreamStandalone, { componentFromStreamWithConfig as componentFromStreamWithConfigStandalone } from "recompose/componentFromStream";
import mapPropsStreamStandalone, { mapPropsStreamWithConfig as mapPropsStreamWithConfigStandalone } from "recompose/mapPropsStream";
import createEventHandlerStandalone, { createEventHandlerWithConfig as createEventHandlerWithConfigStandalone } from "recompose/createEventHandler";
import setObservableConfigStandalone from "recompose/setObservableConfig";

function testMapProps() {
    interface InnerProps {
        inn: number
        other: string
     }
    interface OuterProps { out: string }
    const InnerComponent = ({inn}: InnerProps) => <div>{inn}</div>;

    const enhancer = mapProps((props: OuterProps) => ({ inn: 123 }));
    const Enhanced = enhancer(InnerComponent);
    const rendered = (
        <Enhanced
            other='foo'
            out='bar'
        />
    )
}

function testWithProps() {
    interface InnerProps { inn: number }
    interface OuterProps { out: number }
    const InnerComponent = ({inn}: InnerProps) => <div>{inn}</div>;

    const enhancer = withProps((props: OuterProps) => ({ inn: props.out }));
    const Enhanced = enhancer(InnerComponent);
    const rendered = (
        <Enhanced out={123}/>
    )

    const enhancer2 = withProps({ inn: 123 });
    const Enhanced2 = enhancer2(InnerComponent);
    const Rendered2 = (
        <Enhanced2/>
    )
}

function testWithPropsOnChange() {
    interface InnerProps { inn: number }
    interface OuterProps { out: number }
    const InnerComponent = ({inn}: InnerProps) => <div>{inn}</div>;

    const enhancer = withProps((props: OuterProps) => ({ inn: props.out }));
    const Enhanced = enhancer(InnerComponent);
    const rendered = (
        <Enhanced out={123}/>
    )

    const enhancer2 = withProps({ inn: 123 });
    const Enhanced2 = enhancer2(InnerComponent);
    const Rendered2 = (
        <Enhanced2/>
    )
}

function testWithHandlers() {
    interface OuterProps {
        out: number;
    }
    interface InnerProps {
        foo: string;
    }
    interface HandlerProps {
        onSubmit: React.MouseEventHandler<HTMLDivElement>;
        onChange: Function;
    }
    const InnerComponent: React.StatelessComponent<InnerProps & HandlerProps & OuterProps> = ({onChange, onSubmit, foo}) =>
      <div onClick={onSubmit}>{foo}</div>;

    const enhancer = withHandlers<OuterProps & InnerProps, HandlerProps>({
      onChange: (props) => (e: any) => {},
      onSubmit: (props) => (e: React.MouseEvent<any>) => {},
    });
    const Enhanced = enhancer(InnerComponent);
    const rendered = (
        <Enhanced
            foo="bar"
            out={42}
        />
    )

    const enhancer2 = withHandlers<OuterProps & InnerProps, HandlerProps>((props) => ({
      onChange: (props) => (e: any) => {},
      onSubmit: (props) => (e: React.MouseEvent<any>) => {},
    }));
    const Enhanced2 = enhancer2(InnerComponent);
    const rendered2 = (
        <Enhanced2
            foo="bar"
            out={42}
        />
    )

    const handlerNameTypecheckProof = withHandlers<OuterProps, HandlerProps>({ // $ExpectError
      onChange: () => () => {},
      notAKeyOnHandlerProps: () => () => {},
    });

    // The inner props should be fully inferrable
    const enhancer3 = withHandlers({
      onChange: (props: OuterProps) => (e: any) => {},
      onSubmit: (props: OuterProps) => (e: React.MouseEvent<any>) => {},
    });
    const Enhanced3 = enhancer3(({onChange, onSubmit, out}) =>
        <div onClick={onSubmit}>{out}</div>);
    const rendered3 = (
        <Enhanced3
            out={42}
        />
    )

    const enhancer4 = withHandlers((props: OuterProps) => ({
      onChange: (props) => (e: any) => {},
      onSubmit: (props) => (e: React.MouseEvent<any>) => {},
    }));
    const Enhanced4 = enhancer4(({onChange, onSubmit, out}) =>
        <div onClick={onSubmit}>{out}</div>);
    const rendered4 = (
        <Enhanced4
            out={42}
        />
    )
}

function testDefaultProps() {
    interface Props { a: string; b: number; c: number; }
    const innerComponent = ({a, b}: Props) => <div>{a}, {b}</div>;

    const enhancer = defaultProps({ a: "answer", b: 42 });
    const Enhanced = enhancer(innerComponent);
    const rendered = (
        <Enhanced c={42} />
    )
}

function testRenameProp() {
    interface InnerProps { c: string; b: number; }
    interface OuterProps { a: string; b: number; }
    const innerComponent: React.StatelessComponent<InnerProps> = ({c, b}: InnerProps) => <div>{c}, {b}</div>;

    const enhancer = renameProp("a", "c");
    const enhanced: React.ComponentClass<OuterProps> = enhancer(innerComponent);
}

function testRenameProps() {
    interface InnerProps { c: string; d: number; }
    interface OuterProps { a: string; b: number; }
    const innerComponent: React.StatelessComponent<InnerProps> = ({c, d}: InnerProps) => <div>{c}, {d}</div>;

    const enhancer = renameProps({ a:"c", b: "d" });
    const enhanced: React.ComponentClass<OuterProps> = enhancer(innerComponent);
}

function testFlattenProp() {
    interface InnerProps { a: string; b: string; y: {c: string; d: number;} }
    interface OuterProps { x: {a: string; b: number;}; y: {c: string; d: number;} }
    const innerComponent: React.StatelessComponent<InnerProps> = (props: InnerProps) => <div></div>;

    const enhancer = flattenProp("x");
    const enhanced: React.ComponentClass<OuterProps> = enhancer(innerComponent);
}

function testWithState() {
    interface InnerProps { count: number; setCount: (count: number) => number }
    interface OuterProps { title: string }
    const InnerComponent: React.StatelessComponent<InnerProps> = (props) =>
      <div onClick={() => props.setCount(0)}></div>;

    // We can't infer types for TOuter with this form because
    // Typescript only allows all or nothing
    // when defining generics. You can't infer some and define other.
    // For TOuter to be defined as not "{}" we would have to define
    // all the generics.
    const enhancer = withState("count", "setCount", 0);
    const Enhanced = enhancer(InnerComponent);
    const rendered = (
        <Enhanced />
    );

    // Here we're able to infer TOuter since it's defined in the initial state
    // function and Typescript is able to infer it from there.
    const enhancer2 = withState("count", "setCount",
      (p: OuterProps) => p.title.length);
    const Enhanced2 = enhancer2(InnerComponent);
    const rendered2 = (
        <Enhanced2 title="foo" />
    );

    // We can also actually provide the generic necessary
    const enhancer3 = withState<OuterProps, number, "count", "setCount">("count", "setCount", 1);
    const Enhanced3 = enhancer3(props => {
        return <div>{props.count}</div>;
    });
    const rendered3 = (
        <Enhanced3 title="foo" />
    );
}

function testWithStateHandlers() {
    interface State { counter: number; }
    interface Updaters extends StateHandlerMap<State> {
      add: StateHandler<State>;
    }
    interface OuterProps { initialCounter: number, power: number }
    type InnerProps = State & Updaters & OuterProps;
    const InnerComponent: React.StatelessComponent<InnerProps> = (props) =>
        <div>
            <div>{`Initial counter: ${props.initialCounter}`}</div>
            <div>{`Counter: ${props.counter}`}</div>
            <div onClick={() => props.add(2)}></div>
        </div>;

    const enhancer = withStateHandlers<State, Updaters, OuterProps>(
        (props: OuterProps) => ({ counter: props.initialCounter }),
        {
            add: (state, props) => n => ({ ...state, counter: state.counter + n ** props.power }),
        },
    );
    const Enhanced = enhancer(InnerComponent);
    const rendered = (
        <Enhanced initialCounter={4} power={2} />
    );

    const updateNameTypecheckProof = withStateHandlers<State, Updaters, OuterProps>(
        (props: OuterProps) => ({ counter: props.initialCounter }),
        { notAKeyOfUpdaters: (state, props) => n => ({ ...state, counter: state.counter + n ** props.power }), }, // $ExpectError
    );

    // The inner props should be fully inferrable
    const enhancer2 = withStateHandlers(
        (props: OuterProps) => ({ counter: props.initialCounter }),
        {
            add: (state, props) => n => ({ ...state, counter: state.counter + n ** props.power }),
        },
    );
    const Enhanced2 = enhancer((props) =>
        <div>
            <div>{`Counts from: ${props.initialCounter}`}</div>
            <div>{`Counter: ${props.counter}`}</div>
            <div onClick={() => props.add(2)}></div>
        </div>);
    const rendered2 = (
        <Enhanced initialCounter={4} power={2} />
    );
}

function testWithReducer() {
    interface State { count: number }
    interface Action { type: string }
    interface InnerProps { title: string; count: number; dispatch: (a: Action) => void; }
    interface OuterProps { title: string; bar: number; }
    const InnerComponent: React.StatelessComponent<InnerProps> = (props) =>
      <div onClick={() => props.dispatch({type: "INCREMENT"})}></div>;

    // Same issue here inferring TOuter as with the "withState" form.
    const enhancer = withReducer("count", "dispatch",
      (s: number, a: Action) => s + 1, 0);
    const Enhanced = enhancer(InnerComponent);
    const rendered = (
        <Enhanced title="foo"/>
    );

    // Here we successfully infer TOuter from the initial state function
    const enhancer2 = withReducer("count", "dispatch",
      (s: number, a: Action) => s + 1,
      (props: OuterProps) => props.title.length);
    const Enhanced2 = enhancer2(InnerComponent);
    const rendered2 = (
        <Enhanced2
            title="foo"
            bar={42}
        />
    );
}

function testBranch() {
    interface InnerProps { count: number; update: () => void; }
    interface OuterProps { toggled: boolean }

    const innerComponent: React.StatelessComponent<InnerProps> = (props: InnerProps) =>
      <div onClick={() => props.update()}>{props.count}</div>;
    const innerComponent2 = () => <div>Hello</div>;

    const enhancer = branch(
      (props: OuterProps) => props.toggled,
      withState("count", "update", 0),
      withState("count", "update", 100)
    );
    const enhancer2 = branch(
      (props: OuterProps) => props.toggled,
      renderComponent(innerComponent),
    )
    const enhanced: React.ComponentClass<OuterProps> = enhancer(innerComponent);
    const enhanced2: React.ComponentClass<OuterProps> = enhancer2(innerComponent);
}

function testRenderComponent() {
    interface InnerProps { count: number; update: () => void; }
    interface OuterProps { toggled: boolean }

    const innerComponent = () => <div>Hello</div>;

    const enhancer = renderComponent(() => <span>Nop!</span>);
    const enhanced: React.ComponentClass<OuterProps> = enhancer(innerComponent);
}

function testWithObservableConfig() {
  let componentFromStreamMost = componentFromStreamWithConfig(mostConfig)
  componentFromStreamMost = componentFromStream

  let mapPropsStreamMost = mapPropsStreamWithConfig(mostConfig)
  mapPropsStreamMost = mapPropsStream

  let createEventHandlerMost = createEventHandlerWithConfig(mostConfig)
  let { handler: handler, stream: stream } = createEventHandler()
  createEventHandlerMost = createEventHandler
}

function testOnlyUpdateForKeys() {
    interface Props {
        foo: number;
        bar: string;
    }
    const component: React.StatelessComponent<Props> = (props) => <div>{props.foo} {props.bar}</div>
    onlyUpdateForKeys<Props>(['foo'])(component)
    // This should be a compile error
    // onlyUpdateForKeys<Props>(['fo'])(component)
}

function testLifecycle() {
    interface Props {
        foo: number;
        bar: string;
    }
    interface State {}
    interface Instance {
        instanceValue: number
    }
    const component: React.StatelessComponent<Props> = (props) => <div>{props.foo} {props.bar}</div>
    lifecycle<Props, State, Instance>({
        instanceValue: 1,
        componentDidMount() {
            this.instanceValue = 2
        }
    })(component)
}
