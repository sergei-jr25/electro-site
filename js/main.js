// Импортируем маску и валидацию телефона
import { initPhoneMask, validateRussianPhone } from './phone-mask.js'

// ========== ИНИЦИАЛИЗАЦИЯ МАСКИ ==========
initPhoneMask()

// ========== ЛАЙТБОКС ДЛЯ ГАЛЕРЕИ ==========
const galleryItems = document.querySelectorAll('.gallery-item img')
const lightbox = document.getElementById('lightbox')
const lightboxImg = document.getElementById('lightboxImg')

if (galleryItems.length && lightbox) {
	galleryItems.forEach(img => {
		img.addEventListener('click', e => {
			e.stopPropagation()
			lightboxImg.src = img.src
			lightbox.classList.add('active')
		})
	})

	lightbox.addEventListener('click', () => {
		lightbox.classList.remove('active')
	})
}

// ========== ОТПРАВКА В TELEGRAM С ВАЛИДАЦИЕЙ ==========
const BOT_TOKEN = '8781963890:AAGGlW3xlDH5SiYOlzvKjYckLMqpsFXzU6Q'
const CHAT_ID = '5755345894'

const form = document.getElementById('callbackForm')
const phoneInput = document.getElementById('phone')
const nameInput = document.getElementById('name')

if (form) {
	form.addEventListener('submit', async e => {
		e.preventDefault()

		const name = nameInput.value.trim()
		const phone = phoneInput.value.trim()

		// Валидация имени
		if (!name) {
			alert('⚠️ Пожалуйста, введите ваше имя.')
			nameInput.focus()
			return
		}

		if (name.length < 2) {
			alert('⚠️ Имя должно содержать минимум 2 символа.')
			nameInput.focus()
			return
		}

		// Валидация телефона
		if (!phone) {
			alert('⚠️ Пожалуйста, введите номер телефона.')
			phoneInput.focus()
			return
		}

		const phoneValidation = validateRussianPhone(phone)

		if (!phoneValidation.valid) {
			alert(`⚠️ ${phoneValidation.message}`)
			phoneInput.classList.add('error')
			phoneInput.focus()
			return
		}

		// Убираем класс ошибки, если всё ок
		phoneInput.classList.remove('error')

		// Очищаем телефон от не-цифр для отправки
		const cleanPhone = phone.replace(/\D/g, '')

		const message = `🔌 *НОВАЯ ЗАЯВКА С САЙТА!*\n\n👤 *Имя:* ${name}\n📞 *Телефон:* ${phone}\n🕐 *Время:* ${new Date().toLocaleString('ru-RU')}\n🌐 *Страница:* ${window.location.href}`

		const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`

		try {
			const response = await fetch(url, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					chat_id: CHAT_ID,
					text: message,
					parse_mode: 'Markdown',
				}),
			})

			const data = await response.json()

			if (data.ok) {
				alert('✅ Заявка отправлена! Мы свяжемся с вами в ближайшее время.')
				form.reset()
				// После сброса возвращаем +7 в поле телефона
				if (phoneInput) {
					phoneInput.value = ''
				}
			} else {
				console.error('Telegram error:', data)
				alert('❌ Ошибка отправки. Пожалуйста, позвоните нам по телефону.')
			}
		} catch (error) {
			console.error('Network error:', error)
			alert('❌ Ошибка соединения. Пожалуйста, позвоните нам по телефону.')
		}
	})
}

// ========== ПЛАВНЫЙ СКРОЛЛ ==========
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
	anchor.addEventListener('click', function (e) {
		const targetId = this.getAttribute('href')
		if (targetId === '#') return

		const target = document.querySelector(targetId)
		if (target) {
			e.preventDefault()
			target.scrollIntoView({
				behavior: 'smooth',
				block: 'start',
			})
		}
	})
})

// ========== ТЕКУЩИЙ ГОД В ФУТЕРЕ ==========
const footerYear = document.querySelector('.footer p')
if (footerYear) {
	const year = new Date().getFullYear()
	footerYear.innerHTML = footerYear.innerHTML.replace('2025', year)
}
