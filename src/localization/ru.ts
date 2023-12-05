export const ruTranslation = {
  translation: {
    version: 'Версия программы',
    tabs: {
      fines: 'Штрафы',
      cars: 'Мои авто',
      profile: 'Профиль',
      payments: 'Платежи',
      settings: 'Настройки',
      osago: 'ОСАГО',
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
        'Список автомобилей для проверки штрафов с системы "Безопасный город"',
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
      payByMBank: 'Оплатить через Mbank',
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
      settings: 'Настройки',
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
      deleteAcc: 'Удалить аккаунт?',
      deleteAccount: 'Удалить аккаунт',
      delete: 'Удалить',
      addCard: 'Добавить карту',
      emptyCards: 'У вас нет сохраненных карт',
      deleteCard: 'Удалить карту {{number}}?',
    },
    premium: {
      activate: 'Активировать премиум',
      activateButton: 'Активировать',
      title: {
        carsLimit:
          'Для добавления более 2-х авто неоходимо активировать премиум подписку',
        timeLimit:
          'Вы сможете добавить авто через {{count}} мин. или активировать преум подписку',
      },
      premium: 'Премиум',
      subscribe: 'Оформить подписку',
      description:
        'до 10 авто в профиле \nистория платежей \nобновление статусов 2 раза в сутки',
      eula: 'EULA',
      agreement: 'Соглашение',
      restorePurchase: 'Восстановить покупку',
    },
    osago: {
      title: 'ОСАГО',
      subTitle:
        'Обязательное страхование по которому страховая компания возместит ущерб, нанесённый Вами другим участникам ДТП.',
      emptyDescription: 'У вас нет \n оформленных полисов',
      applyOsago: 'Оформить ОСАГО',
      selectCity: 'Выберите город',
      statementScreen: {
        title: 'Заявка',
        totalInformation: 'Общие данные',
        iAmTheOwner: 'Я собственник автомобиля',
        iAmTheOwnerSubtitle:
          'Если вы не являетесь собственником автомобиля, вам потребуется загрузить доверенность с правом на отчуждение или доверенность для ведения дел в страховании',
        iHaveCard: 'У меня есть карта о техосмотре авто за 2023 год',
        carRegisteredInKr: 'Авто зарегистрировано в КР',
        product: 'Продукт',
        validity:
          'Выберите из списка срок действия ОСАГО\nЯ хочу застраховаться на:',
        email: 'Адрес электронной почты, куда будут отправлены копии',
        phone: 'Контактный номер телефона',
        date: 'Дата рождения',
        pin: 'ПИН / ИНН',
        driverLicenseDate: 'Дата выдачи первого водительского удостоверения',
        driver: 'Водитель {{number}}',
        surname: 'Фамилия',
        name: 'Имя',
        secondName: 'Отчество',
        class: 'Класс водителя',
        addDriver: 'Добавить еще одного водителя',
        infoAboutCar: 'Данные об автомобиле',
        carModel: 'Марка автомобиля',
        model: 'Модель',
        yearOfIssue: 'Год выпуска',
        carType: 'Тип авто',
        numberOfSeats: 'Количество мест',
        engineCapacity: 'Объем двигателя',
        motorPower: 'Мощность электродвигателя',
        loadCapacity: 'Грузоподъемность',
        engineNumber: 'Номер двигателя',
        policeInformation: 'Информация о полисе',
        doYouNeedDelivery: 'Нужна ли вам доставка полиса?',
        deliveryPaid: 'Доставка оплачивается отдельно!',
        doYouNeedDeliverySubtitle:
          'Поставьте галочку если вы хотите чтобы мы доставили полис к вам.',
        whereToDeliver: 'Куда доставить полис',
        whereToPick: 'Где вам удобно будет забрать полис?',
        IRead: 'Я прочитал(а) и соглашаюсь со всеми ',
        rules: 'правилами',
        and: ' и ',
        conditions: 'условиями',
        registration: 'оформления полиса',
        loadDoc: 'Загрузить документы',
        questionTitle: 'Что такое класс водителя?',
        questionText:
          'Это система страховых коэффициентов, определяющих цену полиса в зависимости от того, были страховые случаи или нет. Если полис приобретается впервые, то водителю автоматически присваивается 3 класс. Чем выше класс, тем дешевле полис',
      },
      documentsScreen: {
        title: 'Загрузка документов',
        subTitle:
          'Изображения должны быть четким, текст должен легко читаться. В случае если если данные с изображений будут нечитаемы - заявка будет аннулирована.',
        idCart: 'ID карта с обеих сторон',
        driverLicense: 'Водительское удостоверение с обеих сторон',
        powerAttorney: 'Доверенность на авто',
        addPhoto: 'Добавить',
        car: 'Автомобиль',
        registration: 'Техпаспорт с обеих сторон',
        registrationCard: 'Карточка техосмотра с обеих сторон',
        drawUp: 'Оформить',
      },
      infoPaymentScreen: {
        title: 'Информация',
      },
      osagoListScreen: {
        application: 'Заявка №СP-{{number}}',
        policy: 'Полис №{{number}}',
        applicationDate: 'Дата заявки {{date}}',
      },
    },
  },
};
