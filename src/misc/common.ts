export const countTextFormatter = (n: number, titles: [string, string, string]) => {
    return titles[
        n % 10 === 1 && n % 100 !== 11 ? 0 : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? 1 : 2
    ];
};

export const truncateString = (str, maxLength) => {
    if (str.length <= maxLength) {
        return str;
    }

    const firstPart = str.slice(0, 7);
    const lastPart = str.slice(-7);

    return `${firstPart}...${lastPart}`;
}

export const formatFileSize = (sizeInBytes: number): string => {
	if (sizeInBytes < 1024) {
	  return `${sizeInBytes} Bytes`;
	} else if (sizeInBytes < 1048576) {
	  return `${(sizeInBytes / 1024).toFixed(2)} KB`;
	} else {
	  return `${(sizeInBytes / 1048576).toFixed(2)} MB`;
	}
};

export const getFileExtension = (name: string): string => {
    return name.split('.').at(-1).toUpperCase()
}

export const convertFileToBase64 = (file: File): Promise<string> => {
    return new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = reject;
    });
};

export const removeBase64Prefix = (base64String: string): string => {
    const base64PrefixRegex = /^data:image\/[a-zA-Z]+;base64,/;
    const customPrefixRegex = /^dataimage\/jpegbase64\//;

    if (customPrefixRegex.test(base64String)) {

        return base64String.replace(customPrefixRegex, '');
    }

    if (base64PrefixRegex.test(base64String)) {
        return base64String.replace(base64PrefixRegex, '');
    }

    return base64String;
};

export function downloadPDF(base64String: string, fileName: string) {
    const byteCharacters = atob(base64String);
    const byteNumbers = new Array(byteCharacters.length);
  
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
  
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: 'application/pdf' });
  
    const url = URL.createObjectURL(blob);
  
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
  
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
}

export const validateInputCreateFolder = (input: string) => {
    const regex = /^[^<>\[\]\\/:?*"|_\-.,`'@~!]+$/;

    return regex.test(input);
};