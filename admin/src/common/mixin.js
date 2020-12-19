




export const mixinUpload = {
  data(){
    return {
      uploadUrl: "http://localhost:3000/admin/api/upload",
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