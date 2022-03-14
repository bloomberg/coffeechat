import React from 'react'

export default React.forwardRef<
  HTMLButtonElement,
  React.HTMLProps<HTMLButtonElement>
>(function Button({ children, ...buttonProperties }, reference) {
  return (
    <button
      className="bg-slate-900 hover:bg-slate-500 text-white font-semibold hover:text-white py-2 px-4 border"
      {...buttonProperties}
      type="button"
      ref={reference}
    >
      {children}
    </button>
  )
})
