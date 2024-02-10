export const kgTranslation = {
  translation: {
    version: 'Программанын версиясы',
    tabs: {
      fines: 'Айыптар',
      cars: 'Машиналар',
      profile: 'Профиль',
      payments: 'Төлөмдөр',
      settings: 'Ырастоо',
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
    cancel: 'Жокко чыгаруу',
    auth: {
      agree:
        'Баскычты басуу менен мен Айкын офертанын шарттарына макулдугумду берем',
      getCode: 'Кодду алуу үчүн',
      loginRegistration: 'Кирүү / Каттоо',
      phoneInputLabel: 'Телефон номуру',
      codeInputLabel: 'Сиз көрсөткөн номурга \nкод менен билдирме \nжөнөтүлгөн',
      apply: 'Подтвердить',
      changePhone: 'Изменить номер телефона',
      waitingToSendSms: 'СМСти {{count}} кийин кайра жөнөтүү ',
      resendSms: 'СМСти кайра жөнөтүү',
      iAmAgree: 'Мен жеке маалыматтарды иштетүүгө макулмун',
    },
    errors: {
      somethingWentWrong: 'Что-то пошло не так. Попробуйте ещё раз',
      blackList: 'Сиздин номур бөгөттөлгөн',
    },
    cars: {
      title: 'Унааларым',
      empty: 'Билдирүүлөрдү алуу \nүчүн унааны кошуңуз',
      addAuto: 'Унааны кошуу',
      subTitle:
        '"Коопсуз шаар" тутумунан айыптарды текшерүү үчун автомобилдердин тизмеси',
      pin: {
        label: 'ЖИН (14-значный)',
        placeholder: 'ЖИН ИНН',
        error: 'ЖИН (14-значный)',
      },
      number: {
        label: 'Унаанын номуру',
        placeholder: 'X0000XX, 00KG000XXX ',
        error: 'Унаанын номурун текшериңиз',
      },
      car: 'Унааларым',
      deleteCar: 'Жоюу {{number}}',
      delete: 'Жоюу',
      inn: 'Унаа ээсинин ЖИН: {{inn}}',
    },
    fines: {
      title: 'Айыптар',
      happy: 'Куттуктайбыз!',
      empty: 'Биз айып тапкан жокпуз',
      singleFineTitle: 'Айыптар',
      violationAmmount: 'Төлөм',
      violationPlace: 'Место нарушения',
      paymentStatusName: 'Погашение штрафа',
      paymentNumber: 'Төлөм код',
      pay: 'Төлөө',
      unpaid: 'Төлөнбөгөндөр',
      paid: 'Төлөнгөндөр',
      selectType: 'Айыптык төлөмдүн түрүн тандаңыз',
      cameraFine: 'Коопсуз шаар\nАЙЫПТЫК ТӨЛӨМДӨРҮ',
      policeFine: 'ЖКК\nАЙЫПТЫК ТӨЛӨМДӨРҮ',
      paymentByCode: 'Төлөм код \nбелгиси боюнча төлөө',
      paymentCode: 'Төлөм код',
      paymentAmmount: 'Төлөнүүчү сумма\nАвтоматтык түрдө толтурулат',
      goToPay: 'Төлөм жүргүзүүгө өтүу',
      codeNotFound: 'Төлөө коду табылган жок!',
      scanQrCode: 'Код белгисин сканерлөө',
      closeScanner: 'Жокко чыгаруу',
    },
    payments: {
      payByCard: 'Карта менен төлөө',
      payByMBank: 'MBank аркылуу төлөө',
      title: 'Төлөмдөр',
      empty: 'Не Бир да дүмүрчөк табылган жок',
      receipt: 'Квитанция',
      paymentInfo: 'Төлөм маалыматы',
      subTitle:
        'Төлөмдөр табылды: {{number}}\nАкыркы 30 күндөгү төлөмдөр чагылдырылат. Төлөмдөрдүн бардык тарыхын кароо үчүн Премиум катталууну активдештириңиз.',
      serviceProviderDps: {
        type: 'ЖКК айыптарын төлөө',
        provider: 'Инфосистемс',
      },
      serviceProviderCity: {
        type: 'Коопсуз шаардын айыптарын төлөө',
        provider: 'Коопсуз шаар (ГП Инфосистемс)',
      },
      operationType: 'Операциянын тиби',
      article: 'Укук бузуунун беренеси',
      paymentNumber: 'Номер квитанции',
      serviceProvider: 'Кызмат көрсөтүүчү',
      dateCreate: 'Дата создания',
      datePayment: 'Төлөм күнү',
      protocolNumber: 'Номер протокола',
      number: 'Унаанын номуру',
      paymentSum: 'Төлөнүүчү сумма',
    },
    settings: {
      title: 'Ырастоо',
      registration: 'Жол-жоболоштуруу',
      pushLabel: 'PUSH Билдирүүлөр',
      info: 'Маалымат',
      questions: 'Көп берилүүчү суроолор',
      userAgreement: 'Колдонуучулук макулдашуу',
      privacyPolicy: 'Конфиденциалдуулук саясаты',
      eula: 'EULA',
    },
    profile: {
      title: 'Профиль',
      finesPaid: 'Төлөнгөн айыптар',
      settings: 'Ырастоо',
      accumulatedPoints: 'Балл топтоо',
      support: 'Техникалык колдоо',
      selectLanguage: 'Выбрать язык',
      exit: 'Чыгуу',
      ru: 'Русский',
      kg: 'Кыргыз тили',
      name: 'Аты',
      lastName: 'Фамилиясы',
      editProfile: 'Профилди өзгөртүп оңдоо',
      save: 'Сактоо',
      selectAvatar: 'Профиль сүрөтүн тандоо',
      fromGallery: 'Галереядан тандоо',
      fromCamera: 'Камера',
      myCards: 'Менин кредиттик карталарым',
      deleteAcc: 'Аккаунтту өчүрүү?',
      deleteAccount: 'Аккаунтту өчүрүү',
      delete: 'Өчүрүү',
      addCard: 'Карт кошуу',
      emptyCards: 'Сакталган карталарыңыз жок',
      deleteCard: 'Картты өчүрүү {{number}}?',
    },
    premium: {
      activate: 'Премиум активдештирүү',
      activateButton: 'Активдештирүү',
      title: {
        carsLimit: '2төн көп автону кошуу үчүн катталууну активдештирүү керек',
        timeLimit: 'Автону {{count}} мин. кийин кошо аласыз',
      },
      premium: 'Премиум',
      subscribe: 'Премиумдук активдештирүү',
      description:
        'профилдеги 10 унаага чейин \nтөлөм тарыхы \nстатусу күнүнө 2 жолу жаңыртылат',
      eula: 'EULA',
      agreement: 'Макулдашуу',
      restorePurchase: 'Калыбына келтирүү',
    },
    osago: {
      title: 'ОСАГО',
      subTitle:
        'Камсыздандыруу компаниясы сиз ЖТК натыйжасында кимдир бирөөгө келтирген зыянды сиз үчүн ордун толтурат.',
      hasBranches: 'Тандалган аймакта филиалдар бар',
      hasNotBranches: 'Курьердик жеткирүү гана жеткиликтүү',
      emptyDescription: 'Сизде таризделген\nполистер жок',
      applyOsago: 'АЖЖМК тариздөө',
      selectCity: 'Аймакты тандоо',
      statementScreen: {
        title: 'Өтүнмө',
        totalInformation: 'Жалпы маалыматтар',
        iAmTheOwner: 'Арыз ээси менчик ээси болуп саналат:',
        iAmTheOwnerSubtitle:
          'Эгерде сиз транспорттун менчик ээси болбосоңуз, ажыратуу укугу менен ишеним катты же АЖЖМК тариздөөгө ишеним катты тиркөө талап кылынат',
        iHaveCard: 'Менде ушул жылга транспортту техкароо жөнүндө карточка бар',
        carRegisteredInKr: 'Транспорт КРда катталган',
        product: 'Продукт',
        selectedPeriod: 'Тизмеден АЖЖМК колдонуу мөөнөтүн тандаңыз',
        email:
          'Документтердин көчүрмөлөрү жөнөтүлө турган электрондук почта дареги',
        phone: 'Байланыш телефон номери',
        date: 'Туулган күнү',
        pin: 'ПИН (паспорттогу 14 орундуу код):',
        driverLicenseDate: 'Дата выдачи первого водительского удостоверения',
        driver: 'Айдоочу {{number}}',
        surname: 'Фамилиясы',
        name: 'Аты',
        secondName: 'Атасынын аты',
        class: 'Айдоочу классы:',
        addDriver: 'Айдоочуну кошуу',
        infoAboutCar: 'Транспорт каражаты жөнүндө маалымат',
        carModel: 'ТК маркасы',
        model: 'Модели',
        carNumber: 'Мам.номер',
        yearOfIssue: 'Чыгарылган жыл:',
        carType: 'Транспорттун түрү',
        carVin: 'VIN, эгерде оң рулдуу авто болсо - кузовдун номери',
        policeInformation: 'Жеткирүү жөнүндө маалымат',
        isPickUp: 'Сизге полисти жеткирүү керекпи?',
        deliveryPaid: 'Жеткирүү өзүнчө төлөнөт!',
        isPickUpSubtitle: 'Көңүл буруңуз! Жеткирүү өзүнчө төлөнөт.',
        whereToDeliver: 'Полисти кайта жеткирүү керек',
        pickUpOffice: 'Сизге полисти кайдан алып кетүү ыңгайлуу?',
        IRead: 'Мен ',
        rules: 'камсыздандыруу эрежелерине',
        rulesTitle: 'Правила',
        conditionsTitle: 'Условия страхования',
        and: ' жана ',
        conditions: 'шарттарына макулмун',
        registration:
          'жана кабыл алам, көрсөтүлгөн маалыматтардын тууралыгын ырастайм',
        loadDoc: 'Документтерди жүктөө',
        questionTitle: 'Что такое класс водителя?',
        selectItemFromList: 'Тизмеден тандаңыз',
        questionText:
          'Это система страховых коэффициентов, определяющих цену полиса в зависимости от того, были страховые случаи или нет. Если полис приобретается впервые, то водителю автоматически присваивается 3 класс. Чем выше класс, тем дешевле полис',
        error: 'Не заполнены обязательные поля',
        errorDoc: 'Не добавлены все документы',
      },
      documentsScreen: {
        title: 'Документтерди жүктөө',
        subTitle:
          'Сүрөт даана болушу керек, текст оңой окулушу керек. Эгерде сүрөттөрдөгү маалыматтар окулбаса, өтүнмө жокко чыгарылат.',
        idCart: 'ID карта эки тарабы тең',
        driverLicense: 'Айдоочулук күбөлүк эки тарабы тең',
        powerAttorney: 'Автого ишеним кат',
        addPhoto: 'Кошуу',
        car: 'Автоунаа',
        registration: 'Техпаспорт эки тарабы тең',
        registrationCard: 'Техкароо карточкасы эки тарабы тең',
        drawUp: 'Тариздөө',
      },
      infoPaymentScreen: {
        title: 'Маалымат',
        policyholder: 'Айдоочу/камсыздандырылуучу',
        driver: 'Айдоочу {{number}}',
        yes: 'Ооба',
        no: 'Жок',
        isOwner: 'Арыз ээси менчик ээси болуп саналат:',
        surname: 'Атасынын аты:',
        firstName: 'Аты:',
        lastName: 'Туулган күнү:',
        bithday: 'Туулган күнү:',
        pin: 'ПИН (паспорттогу 14 орундуу код):',
        driverClass: 'Айдоочу классы:',
        driveLicenseDate: 'Биринчи айдоочулук күбөлүк берилген күн:',
        amountInsurance: 'Камсыздандыруу суммасы:',
        more: 'Кененирээк',
        status: 'Статус:',
        totalInformation: 'Жалпы маалыматтар',
        insuranceType: 'Камсыздандыруу түрү:',
        numberDrivers: 'Айдоочулардын саны:',
        insurancePeriod: 'Камсыздандыруу мезгили:',
        phoneNumber: 'Телефондун номуру:',
        carData: 'Транспорт каражаты жөнүндө маалымат',
        carModel: 'ТК маркасы:',
        carNumber: 'Мам.номер:',
        model: 'Модели:',
        yearOfIssue: 'Год выпуска:',
        carType: 'Транспорттун түрү:',
        carVin: 'VIN, эгерде оң рулдуу авто болсо - кузовдун номери:',
        carRegisteredInKr: 'Транспорт КРда катталган:',
        technicalInspection: 'Техникалык кароо:',
        policyInfo: 'Маалымат:',
        receiptinfo: 'Алгандыгы жөнүндө маалымат:',
        delivery: 'Жеткирүү:',
        deliveryAddress: 'Жеткирүү дареги:',
        placeReceipt: 'Полисти алуу орду:',
        pay: 'Төлөө',
        cancelInformationDescription:
          'Средства будут возвращены в течении 5-7 дней',
      },
      osagoListScreen: {
        application: 'Өтүнмө № {{number}}',
        policy: 'Полис № {{number}}',
        applicationDate: 'өтүнмө датасы: {{date}}',
        validDate: 'чейин жарактуу: {{date}}',
      },
      policyScreen: {
        title: 'Полис',
      },
      calculationCostScreen: {
        title: 'Полистин наркын эсептөө',
        deliveryCost: 'Жеткирүү:',
        baseCost: 'Базалык наркы:',
        commission: 'Эквайринг үчүн комиссия:',
        totalCost: 'Полистин жалпы наркы:',
        nsp: 'НсП',
      },
    },
  },
};
