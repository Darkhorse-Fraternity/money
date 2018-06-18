import React from 'react'

import {
    StyleAutoGrowingTextInput,
    StyleAutoGrowingChatTextInput,
    StyleTextInput,
} from '../Cunstom/style'

const createInputs = inputCreator => {
    const renderInput = ({ input: { onChangeText,value, ...restInput }, ...rest }) => (
        <StyleAutoGrowingTextInput onChangeText={onChangeText}
                                   {...rest} {...restInput}

        />
    )
    const AutoGrowingInput = inputCreator('Input', renderInput, {}, {})

    const renderChatInput = ({ input: { onChangeText,value, ...restInput }, ...rest }) => (
        <StyleAutoGrowingChatTextInput
            onChangeText={onChangeText}
            {...rest} {...restInput} />
    )
    const AutoGrowingChatInput = inputCreator('Input', renderChatInput, {}, {})

    const renderTextInput = ({input: {onChangeText,value, ...restInput}, ...rest}) => (
        <StyleTextInput onChangeText={onChangeText}
                        {...rest}
                        {...restInput} />
    )
    const TextInput = inputCreator('Input', renderTextInput, {}, {})



    return {
        AutoGrowingInput,
        TextInput,
        AutoGrowingChatInput,
    }
}

export default createInputs
