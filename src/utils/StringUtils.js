
class StringUtils {
    capitalize = (string) => {
        return string.toLowerCase().replace(/(?:^|\s|["'([{])+\S/g, match => match.toUpperCase());
    }
}

export default StringUtils
