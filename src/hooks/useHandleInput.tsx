import React, { ChangeEvent, SetStateAction, useState } from 'react'

const useHandleInput = () => {
    const [value, setValue] = useState<string>('');
    const [name, setName] = useState<string>('')

    const handleChange = (name: SetStateAction<string>, e: ChangeEvent<HTMLInputElement>) => {
      setValue(e.target.value);
      setValue(name);
      
    }
    return {
      name,
      value,
      handleChange
    }
    // Returns an object with value and onChange properties
    
}

export default useHandleInput;