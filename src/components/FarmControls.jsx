import React from 'react'

export default function FarmControls({
  options,
  onChange,
  checked,
  onToggleChange,
  query,
  onSearchChange,
}) {
  return (
    <div className='flex flex-col md:flex-row items-center gap-2 justify-between p-4 main_bg mt-5 rounded-md'>
      <div className='flex justify-between items-center gap-5 w-full md:w-fit'>
        <div>
          <select
            id='countries'
            className='button_bg border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
            onChange={(e) => onChange(e.target.value)}
          >
            {options.map((item, index) => (
              <option value={item.value} key={index}>
                {item.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className='relative inline-flex items-center cursor-pointer'>
            <input
              type='checkbox'
              value={checked}
              onChange={() => onToggleChange()}
              className='sr-only peer'
            />
            <div className="w-11 h-6 button_bg rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
            <span className='ml-3 text-md font-medium '>Staked Only</span>
          </label>
        </div>
      </div>
      <div className='flex w-full md:w-fit'>
        <input
          value={query}
          className='button_bg p-2 rounded-md w-full md:w-fit'
          placeholder='Search Farms'
          onChange={(e) => onSearchChange(e)}
        />
      </div>
    </div>
  )
}
