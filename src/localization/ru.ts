export const ruTranslation = {
  translation: {
    tabs: {
      fines: 'Штрафы',
      cars: 'Мои авто',
      profile: 'Профиль',
      payments: 'Платежи',
      settings: 'Настройки',
    },
    notifications: {
      noConnection: 'Нет соединения с интернетом',
    },
    languages: {
      ru: 'Русский',
      kg: 'Кыргыз тили',
      en: 'English',
    },
    cancel: 'Отмена',
    auth: {
      agree: 'Нажимая на кнопку, я соглашаюсь с условиями \nПубличной оферты',
      getCode: 'Получить код',
      loginRegistration: 'Вход / Регистрация',
      phoneInputLabel: 'Номер телефона',
      codeInputLabel:
        'На указанный вами номер \nбыло отправлено сообщение с кодом. \nВведите его:',
      apply: 'Подтвердить',
      changePhone: 'Изменить номер телефона',
      waitingToSendSms: 'Можно повторить СМС через {{count}} сек',
      resendSms: 'Отправить СМС ещё раз',
    },
    errors: {
      somethingWentWrong: 'Что-то пошло не так. Попробуйте ещё раз',
      blackList: 'Ваш аккаунт заблокирован',
    },
    cars: {
      title: 'Мои авто',
      empty: 'Добавьте авто\nдля получения уведомлений',
      addAuto: 'Добавить авто',
      subTitle:
        'Список автомобилей для проверки штрафов с системы "Безопасный город',
      pin: {
        label: 'ПИН (14-значный)',
        placeholder: 'ПИН ИНН',
        error: 'ПИН должен быть 14-значный',
      },
      number: {
        label: 'Номер автомобиля',
        placeholder: 'X0000XX, 00KG000XXX ',
        error: 'Номер не корректный',
      },
      car: 'Мое авто',
      deleteCar: 'Удалить авто {{number}}',
      delete: 'Удалить',
      inn: 'Пин владельца: {{inn}}',
    },
    fines: {
      title: 'Штрафы',
      happy: 'Поздравляем!',
      empty: 'Мы не нашли штрафов',
      singleFineTitle: 'Штраф',
      violationAmmount: 'Сумма штрафа',
      violationPlace: 'Место нарушения',
      paymentStatusName: 'Погашение штрафа',
      paymentNumber: 'Код оплаты',
      pay: 'Оплатить',
      unpaid: 'Неоплаченные',
      paid: 'Оплаченные',
      selectType: 'Выберите тип штрафа',
      cameraFine: 'ШТРАФЫ \nБезопасного города',
      policeFine: 'ШТРАФЫ \nДПС',
      paymentByCode: 'Оплатить\nпо коду оплаты',
      paymentCode: 'Код оплаты',
      paymentAmmount: 'Сумма к оплате \nЗаполняется автоматически',
      goToPay: 'Перейти к оплате',
      codeNotFound: 'Код оплаты не найден!',
      scanQrCode: 'Сканировать код оплаты',
      closeScanner: 'Закрыть',
    },
    payments: {
      payByCard: 'Оплатить картой',
      title: 'Платежи',
      empty: 'Не найдено ни одной квитанции',
      receipt: 'Квитанция',
      paymentInfo: 'Платежная информация',
      subTitle:
        'Найдено платежей: {{number}}\nОтображаются платежи за последние 30 дней. Для просмотра всей истории платежей активируйте Премиум подписку',
      serviceProviderDps: {
        type: 'Оплата штрафа ДПС',
        provider: 'Инфосистемс',
      },
      serviceProviderCity: {
        type: 'Оплата штрафа Безопасного города',
        provider: 'Безопасный город Инфосистемс',
      },
      operationType: 'Тип операции',
      article: 'Статья',
      paymentNumber: 'Код оплаты',
      serviceProvider: 'Поставщик услуг',
      dateCreate: 'Дата создания',
      datePayment: 'Дата оплаты',
      protocolNumber: 'Номер протокола',
      number: 'Номер авто',
      paymentSum: 'Сумма к оплате',
    },
    settings: {
      title: 'Настройки',
      registration: 'Оформление',
      pushLabel: 'PUSH уведомления',
      info: 'Информация',
      questions: 'Часто задаваемые вопросы',
      userAgreement: 'Пользовательское соглашение',
      privacyPolicy: 'Политика конфиденциальности',
      eula: 'EULA',
    },
    profile: {
      title: 'Профиль',
      finesPaid: 'Оплачено штрафов',
      accumulatedPoints: 'Накопленных балов',
      support: 'Тех. поддержка',
      selectLanguage: 'Выбрать язык',
      exit: 'Выход',
      ru: 'Русский',
      kg: 'Кыргыз тили',
      en: 'English',
      name: 'Имя',
      lastName: 'Фамилия',
      editProfile: 'Редактировать профиль',
      save: 'Сохранить',
      selectAvatar: 'Выбрать фото',
      fromGallery: 'Галерея',
      fromCamera: 'Камера',
      myCards: 'Мои карты',
      deleteAcc: 'Удалить аккаунт',
      delete: 'Удалить',
    },
    premium: {
      activate: 'Ативировать премиум',
      title: {
        carsLimit:
          'Для добавления более 2-х авто неоходимо активировать премиум подписку',
        timeLimit:
          'Вы сможете добавить авто через {{count}} мин. или активировать преум подписку',
      },
    },
  },
};
