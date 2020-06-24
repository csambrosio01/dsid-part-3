import Api from "../api/Api";

const USER = '_logged_user';

const validEmailRegex = RegExp('^(([^<>()\\[\\]\\\\.,;:\\s@"]+(\\.[^<>()\\[\\]\\\\.,;:\\s@"]+)*)|(".+"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$');
const validPasswordRegex = RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&#(){}?:;><=.,^~_+-\\[\\]])[A-Za-z\\d@$!%*?&#(){}?:;><=.,^~_+-\\[\\]]{8,40}$')
const validPhoneNumberRegex = RegExp('^\\([1-9]{2}\\) (?:[2-8]|9[1-9])[0-9]{3} [0-9]{4}$')

class UserService {
    save = (user) => {
        localStorage.setItem(USER, JSON.stringify(user))
    }

    validateField = (user, errors, fieldName, fieldValue) => {
        switch (fieldName) {
            case 'name':
                let name = fieldValue.split(' ')
                let isValid = name.length >= 2;
                name.forEach(value => {
                    value.length <= 3 && (isValid = false)
                })
                errors.name = isValid ? '' : 'Preencha com seu nome completo'
                break;
            case 'email':
                errors.email = validEmailRegex.test(fieldValue) ?
                    '' :
                    'Preencha com um e-mail válido'
                break;
            case 'password':
                errors.password = validPasswordRegex.test(fieldValue) ?
                    '' :
                    'A senha deve possuir no mínimo 8 caracteres, uma letra maiúscula, uma letra minúscula e um símbolo'
                break;
            case 'phoneNumber':
                errors.phoneNumber = validPhoneNumberRegex.test(fieldValue) ?
                    '' :
                    'Preencha com um telefone válido'
                break;
            case 'confirmPassword':
                errors.confirmPassword = (fieldValue === user.password) ? '' : 'Deve ser igual ao campo senha'
                break;
            default:
                errors[fieldName] = fieldValue.length > 0 ? '' : 'O campo é obrigatório'
                break;
        }

        return errors;
    }

    validate = (user) => {
        let errors = {}
        Object.keys(user).forEach(fieldName => {
            this.validateField(user, errors, fieldName, user[fieldName])
        })

        return errors;
    }

    createUser = (user) => {
        return Api.post('/users/create', user)
            .then(response => {
                this.save(response.data)
            })
    }

    login = (login) => {
        return Api.post('/login', login)
            .then(response => {
                this.save(response.data)
            })
    }
}

export default UserService
