import  QRCode from 'qrcode'

//receive json data stringified
export const generateQR = async (text) => {
    try {
     const qrStr = await QRCode.toDataURL(text);  
        return {qrStr}// res.status(200).json({testUrlRes : await QRCode.toDataURL(text)})
    //   console.log(await QRCode.toDataURL(text))
    } catch (err) {
      console.error(err)
    }
  }