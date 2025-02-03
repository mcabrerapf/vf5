const copyToClipboard = (text) => {
    if (!text || typeof text !== 'string') return;
    navigator.clipboard.writeText(text);
  };
  
  export default copyToClipboard;
  