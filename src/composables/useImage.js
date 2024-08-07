import { ref, computed } from 'vue'
import { useFirebaseStorage } from 'vuefire'
import { ref as storageRef, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import { uid } from 'uid'

const useImage = () => {
  const url = ref('')
  const storage = useFirebaseStorage()
  const loading = ref(false)

  const onFileChange = (e) => {
    loading.value = true
    const file = e.target.files[0]
    const name = file.name.split('.')
    const typeFile = name[name.length - 1].toLowerCase()

    const fileName = uid() + '.' + typeFile
    const sRef = storageRef(storage, '/products/' + fileName)

    //Sube el archivo
    const uploadTask = uploadBytesResumable(sRef, file)

    uploadTask.on(
      'state_changed',
      () => {},
      (error) => {
        loading.value = false
      },
      () => {
        //La imagen ya se subio

        getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
          console.log(downloadUrl)
          url.value = downloadUrl
          loading.value = false
        })
      }
    )
  }

  const isImageUploaded = computed(() => !!url.value)
  const isLoading = computed(() => loading.value)

  return {
    onFileChange,
    url,
    isImageUploaded,
    isLoading
  }
}

export default useImage
