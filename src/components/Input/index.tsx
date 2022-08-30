import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import _ from 'lodash'
import { TagsInput } from 'react-tag-input-component'
import { storageUtils } from '../../utils/localstorage.utils'
import './styles.scss'

export default function Input() {
  const [inputs, setInputs] = useState<Array<string>>([])
  const [showSuggestions, toggleSuggestions] = useState<boolean>(false)
  const navigate = useNavigate()

  // limit to 3 currency pairs
  const handleCheck = (tag: string, tags: Array<string>) => {
    if (inputs && (_.size(inputs)<3 || _.size(inputs)>=3 && _.size(tags)<3))
      return true
    return false
  }

  // when user presses the 'Track' button
  const handleSubmit = () => {
    // set currency pairs to uppercase
    const value: Array<string> = []
    _.forEach(inputs, (i:string) => value.push(i.toUpperCase()))

    // set pairs to localStorage and direct user to /chart
    storageUtils.setJsonItem('pairs', value)
    navigate("/chart")
  }

  return (
    <>
      <span>
        {inputs.length<3
            ? "Select your currency pairs (up to 3 pairs):"
            : "Press the 'Track' button to proceed"
        }
      </span>
      <div className="multi-selector-input"
        onFocus={() => toggleSuggestions(true)}
        onBlur={() => toggleSuggestions(false)}
      >
        <TagsInput
          name={'pairs'}
          value={inputs}
          onChange={setInputs}
          beforeAddValidate={handleCheck}
          placeHolder={inputs.length<3 ? "enter new pair" : ""}
        />
        <button
          className={'track-button'}
          onClick={handleSubmit}
          disabled={inputs.length<=0}
        >Track</button>
      </div>
      {showSuggestions && 
        <div className="pair-suggestions">
            holol
        </div>
      }
    </>
  )
}
