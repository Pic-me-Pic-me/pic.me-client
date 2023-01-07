// base64를 file 타입으로 변환하는 함수
export const setDataURLtoFile = (dataurl: string, filename: string) => {
  const arr = dataurl.split(',');
  if (arr) {
    const mime = arr[0].slice(5, 15);
    const bstr = window.atob(arr[1]);
    let n = bstr.length;
    const uInt8Arr = new Uint8Array(n);
    while (n--) {
      uInt8Arr[n] = bstr.charCodeAt(n);
    }
    return new File([uInt8Arr], filename, {
      type: mime,
    });
  }
};
