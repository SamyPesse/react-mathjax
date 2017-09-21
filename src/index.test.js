import React from 'react'
import ReactDOM from 'react-dom'
import * as MathJax from './'
import renderer from 'react-test-renderer'

it('Renders correctly', ()=>{
  const div = document.createElement('div')
  const tex = `f(x) = \\int_{-\\infty}^\\infty
      \\hat f(\\xi)\\,e^{2 \\pi i \\xi x}
      \\,d\\xi`

  const example = (
    <MathJax.Context>
      <div>
        This is an inline math formula: <MathJax.Node inline>{'a = b'}</MathJax.Node>
        And a block one:

        <MathJax.Node>{tex}</MathJax.Node>
      </div>
    </MathJax.Context>
  )
  ReactDOM.render(example, div)

  const tree = renderer.create(example).toJSON()
  expect(tree).toMatchSnapshot()
})

