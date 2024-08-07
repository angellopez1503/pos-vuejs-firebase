import { generateClasses } from '@formkit/themes'

const config = {
  config: {
    classes: generateClasses({
      global: {
        label: 'block mb-1 font-bold text-base',
        message: 'text-red-500 text-sm',
        wrapper:'space-y-1 mb-2',
        input:'w-full p-2 border border-gray-300 rounded text-gray-700 placeholder-gray-400',
         
      },
      text: {
        // message:'$reset text-blue-500'
      },
      number: {},
      file: {
        noFiles:'block my-2',
        fileItem:'hidden'
      },
      select: {},
      submit:{
        input:'$reset bg-green-400 hover:bg-green-500 w-full p-2 font-bold uppercase rounded shadow disabled:opacity-50 mt-5'
      }
    })
  }
}

export default config
