import React, { useEffect, useState } from 'react'

/**
 * LIFE CYCLES
 * 
 * These 3 components show examples of the different way React's
 * Life Cycle hooks can be used and what their effects are.
 * 
 * TODO: Create an example of useLayoutEffect()
 */
const LifeCyclesPage = () => {
    return (
        <div>
            <h1>Welcome to the Life Cycles page!</h1>
            <TickerComponentInfinite />
            <TickerComponentSingle />
            <TickerComponentConditional />
        </div>
    )
}

/**
 * This effect runs in an infinite loop.
 * This is because any time there is a change in a component,
 * React will re-render that component, running the code all over again.
 * If the useEffect hook is not given any conditions for which it should run,
 * it will do so each render.
 */
const TickerComponentInfinite = () => {
    const [num, setNum] = useState(0)

    const onButtonPress = () => {
        setNum(num + 1)
    }

    useEffect(() => {
        setInterval(() => setNum((_val) => _val + 1), 1000)
    })

    return (
        <div>
            <h2>Infinite Looping Effect</h2>
            <div>Updated Number: {num}</div>
            <button onClick={onButtonPress}>Add 1 to Number</button>
        </div>
    )
}

/**
 * This effect runs only 1 time.
 * useEffect will ALWAYS run on initial load. After that,
 * if a list of dependencies is passed in, useEffect will
 * monitor them and will not run again unless one of them changes.
 * 
 * If the list of empty, no changes will occur, therefore it will never run again.
 */
const TickerComponentSingle = () => {
    const [num, setNum] = useState(0)

    const onButtonPress = () => {
        setNum(num + 1)
    }

    useEffect(() => {
        setNum(1)
        setTimeout(_ => setNum(3000), 2000)
    }, [])

    return (
        <div>
            <h2>Single Run Effect</h2>
            <div>Updated Number: {num}</div>
            <button onClick={onButtonPress}>Add 1 to Number</button>
        </div>
    )
}

/**
 * When one or more valid dependencies are added to a useEffect,
 * it will only run once that dependency is updated.
 * 
 * The sample below shows where the component can update and re-render,
 * but the useEffect does not run because the variable it depends on never changes.
 * It will run one time and not again after that.
 */
const TickerComponentConditional = () => {
    const [num, setNum] = useState(0)
    const [count, setCount] = useState(0)
    const [otherNum, setOtherNum] = useState(0)

    const onChangeComponentNumber = () => {
        setOtherNum(otherNum + 1)
    }

    const onChangeDependencyNumber = () => {
        setNum(num + 1)
    }

    useEffect(() => {
        // If you are using a variable inside of a useEffect that you don't want
        // to include as a dependency (since it could cause looping), you can pass
        // the desired changes in a function. useState setters are smart enough to know
        // that if it receives a function, to pass it the current value as an argument
        // then run it.
        // Effectively, setCount(_c => _c + 1)
        // is the same as
        // setCount(count + 1)
        setCount(_c => _c + 1)
    }, [num])

    return (
        <div>
            <h2>Conditionally Ran Effect</h2>
            <div>useEffect Dependency Number (this number is what will trigger useEffect if updated): {num}</div>
            <div>useEffect Updated Number (this number is updated when useEffect runs): {count}</div>
            <div>Component Changing Number (this number is just to cause another render cycle): {otherNum}</div>
            <button onClick={onChangeComponentNumber}>Add 1 to Component Changing Number</button>
            <button onClick={onChangeDependencyNumber}>Add 1 to Dependency Number</button>
        </div>
    )
}

export default LifeCyclesPage
