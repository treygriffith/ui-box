import React from 'react'
import { EnhancerProps } from './enhancers'

export { EnhancerProps }

/**
 * @template T Object
 * @template K Union of keys (not necessarily present in T)
 */
export type Without<T, K> = Pick<T, Exclude<keyof T, K>>

/**
 * @see {@link https://github.com/emotion-js/emotion/blob/b4214b8757c7ede1db1688075251946b2082f9d1/packages/styled-base/types/helper.d.ts#L6-L8}
 */
export type PropsOf<
	E extends keyof JSX.IntrinsicElements | React.JSXElementConstructor<any>
> = JSX.LibraryManagedAttributes<E, React.ComponentPropsWithRef<E>>

/**
 * Generic component props with "is" prop
 * @template P Additional props
 * @template T React component or string element
 */
export type BoxOwnProps<E extends React.ElementType = React.ElementType> = EnhancerProps & {
  /**
   * Replaces the underlying element
   */
  is?: E

  /**
   * Allows the high level value of safeHref to be overwritten on an individual component basis
   */
  allowUnsafeHref?: boolean
}

export type BoxProps<E extends React.ElementType> = BoxOwnProps<E> & Without<PropsOf<E>, keyof BoxOwnProps>

/**
 * Convenience method for defining your own components that extend Box and pass-through props
 */
export type BoxComponent<P, D extends React.ElementType = 'div'> = <
  E extends React.ElementType = D
>(props: P & Without<BoxProps<E>, keyof P>) => JSX.Element
