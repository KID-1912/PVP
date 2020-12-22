




export const mixinUpload = {
  data(){
    return {
      uploadUrl: "./api/upload",
    }
  },
  methods: {
    getAuthHeader(){
      const token = sessionStorage.getItem('token') || '';
      return {
        Authorization: `Basic ${token}`
      }
    }
  }
}