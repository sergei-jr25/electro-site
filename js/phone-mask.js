// Маска для телефона + валидация
export function initPhoneMask() {
	const phoneInput = document.getElementById('phone')

	if (!phoneInput) return

	// Маска при вводе
	phoneInput.addEventListener('input', function (e) {
		let value = this.value.replace(/\D/g, '')

		if (value.length > 11) {
			value = value.slice(0, 11)
		}

		let formatted = ''

		if (value.length > 0) {
			if (value[0] === '7' || value[0] === '8') {
				formatted = '+7 '
				let rest = value[0] === '8' ? value.slice(1) : value.slice(1)

				if (rest.length > 0) {
					formatted += '(' + rest.slice(0, 3)
					if (rest.length >= 3) formatted += ') '
					if (rest.length > 3) formatted += rest.slice(3, 6)
					if (rest.length > 6) formatted += '-' + rest.slice(6, 8)
					if (rest.length > 8) formatted += '-' + rest.slice(8, 10)
				}
			} else {
				formatted = value
			}
		}

		this.value = formatted

		// Убираем класс ошибки при вводе
		this.classList.remove('error')
	})

	// Автозаполнение +7 при фокусе
	phoneInput.addEventListener('focus', function () {
		if (this.value === '') {
			this.value = '+7 '
		}
		this.classList.remove('error')
	})

	// Очистка если пусто
	phoneInput.addEventListener('blur', function () {
		if (this.value === '+7 ' || this.value === '+7' || this.value === '') {
			this.value = ''
		}
	})
}

// Функция валидации российского номера
export function validateRussianPhone(phone) {
	// Удаляем все не-цифры
	const digits = phone.replace(/\D/g, '')

	// Проверяем длину (должно быть 11 цифр)
	if (digits.length !== 11) {
		return { valid: false, message: 'Номер должен содержать 11 цифр' }
	}

	// Проверяем, что начинается на 7 или 8
	if (digits[0] !== '7' && digits[0] !== '8') {
		return { valid: false, message: 'Номер должен начинаться с +7 или 8' }
	}

	// Проверка на допустимые коды операторов (первые 3 цифры после 7/8)
	const operatorCode = digits.slice(1, 4)

	// Список допустимых кодов российских операторов
	const validCodes = [
		'900',
		'901',
		'902',
		'903',
		'904',
		'905',
		'906',
		'908',
		'909', // МТС
		'910',
		'911',
		'912',
		'913',
		'914',
		'915',
		'916',
		'917',
		'918',
		'919', // Билайн
		'920',
		'921',
		'922',
		'923',
		'924',
		'925',
		'926',
		'927',
		'928',
		'929', // Мегафон
		'930',
		'931',
		'932',
		'933',
		'934',
		'935',
		'936',
		'937',
		'938',
		'939', // Tele2 и др
		'950',
		'951',
		'952',
		'953',
		'954',
		'955',
		'956',
		'957',
		'958',
		'959',
		'960',
		'961',
		'962',
		'963',
		'964',
		'965',
		'966',
		'967',
		'968',
		'969',
		'970',
		'971',
		'972',
		'973',
		'974',
		'975',
		'976',
		'977',
		'978',
		'979',
		'980',
		'981',
		'982',
		'983',
		'984',
		'985',
		'986',
		'987',
		'988',
		'989',
		'990',
		'991',
		'992',
		'993',
		'994',
		'995',
		'996',
		'997',
		'998',
		'999',
	]

	if (!validCodes.includes(operatorCode)) {
		return { valid: false, message: 'Введите корректный российский номер' }
	}

	return { valid: true, message: '' }
}
