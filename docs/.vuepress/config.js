module.exports = {
	head: [
        ["link", {rel: "apple-touch-icon", size: "180x180", href: "/apple-touch-icon.png"}],
        ["link", {rel: "icon", type: "image/png", size: "32x32", href: "/favicon-32x32.png"}],
        ["link", {rel: "icon", type: "image/png", size: "16x16", href: "/favicon-16x16.png"}],
		["link", {rel: "mask-icon", color: "#5bbad5", href: "/safari-pinned-tab.svg"}],
		["link", {rel: "manifest", href: "/manifest.webmanifest"}]
    ],
	plugins: [
        '@vuepress/back-to-top',
    ],
    locales: {
        '/': {
            lang: 'en-US',
            title: 'IBAX Documentation',
            description: 'A Decentralized Commercial Cross-Chain infrastructure Network',
        },
		'/de/': {
            lang: 'de',
            title: 'IBAX Dokumentation',
            description: 'Ein dezentralisiertes kommerzielles kettenübergreifendes Infrastrukturnetzwerk',
        },
		'/es/': {
            lang: 'es',
            title: 'IBAX Documentación',
            description: 'Una red de infraestructura comercial descentralizada entre cadenas',
        },
		'/fr/': {
            lang: 'fr',
            title: 'IBAX Documentation',
            description: 'A Decentralized Commercial Cross-Chain infrastructure Network',
        },
		'/it/': {
            lang: 'it',
            title: 'IBAX Documentazione',
            description: 'A Decentralized Commercial Cross-Chain infrastructure Network',
        },
		'/ja/': {
            lang: 'ja',
            title: 'IBAX ドキュメンテーション',
            description: 'A Decentralized Commercial Cross-Chain infrastructure Network',
        },
        '/zh-CN/': {
            lang: 'zh-CN',
            title: 'IBAX 文档',
            description: 'A Decentralized Commercial Cross-Chain infrastructure Network',
        },
		'/tr-TR/': {
            lang: 'tr-TR',
            title: 'IBAX Belgeleri',
            description: 'A Decentralized Commercial Cross-Chain infrastructure Network',
        }
    },
    themeConfig: {
        repo: 'IBAX-io',
        docsRepo: 'IBAX-io/documentation',
        logo: '/ibax.ico',
        smoothScroll: true,
        docsDir: 'docs',
        editLinks: true,
        locales: {
            '/': {
                label: 'English',
                selectText: 'Languages',
                ariaLabel: 'Select language',
                editLinkText: 'Edit this page on GitHub',
                lastUpdated: 'Last Updated',
                nav: [
				{text: 'Concept', link: '/concepts/about-the-platform',},
                    {text: 'Tutorial', link: '/tutorials/app_tutorial',},
                    {text: 'Guide', link: '/topics/script'},
                    {text: 'Reference', link: '/reference/api2',},
                    {text: 'Deployment', link: '/howtos/deployment'},
                ],
                sidebar: {
                    '/concepts/': [	
                        {
                            title: 'Concept',
                            collapsable: false,
                            children: [							
								'about-the-platform',
                                'blockchain-layers',
								'consensus',
								'thesaurus',
                            ],
                        },
						{
                            title: 'Common problem',
                            collapsable: false,
                            children: [
                                'faq',
                            ],
                        },
                    ],
                    '/tutorials/': [
                        {
                            title: 'Tutorial',
                            collapsable: false,
                            children: [
                                'app_tutorial',
                            ],
                        },
                    ],
                    '/topics/': [
                        {
                            title: 'Guide',
                            collapsable: false,
                            children: [
								'script',
                                'templates2',
								'vm',
								'daemons',
                            ],
                        },
                    ],
					'/reference/': [
                        {
                            title: 'Reference',
                            collapsable: false,
                            children: [
                                'api2',
								'platform-parameters',
								'backend-config',
								'desync_monitor',
                            ],
                        },
                    ],
					'/howtos/': [
                        {
                            title: 'Deployment',
                            collapsable: false,
                            children: [
                                'deployment',
                            ]
                        }
                    ],
                    '/': 'auto',
                },
            },
            '/zh-CN/': {
				selectText: '选择语言',
                label: '简体中文',
                ariaLabel: '选择语言',
                editLinkText: '在 GitHub 上编辑此页',
                lastUpdated: '上次更新',
                contributorsLabel: '贡献者',
                nav: [
                    {text: '概念', link: '/zh-CN/concepts/about-the-platform',},
                    {text: '教程', link: '/zh-CN/tutorials/app_tutorial',},
                    {text: '指南', link: '/zh-CN/topics/script'},
                    {text: '参考', link: '/zh-CN/reference/api2',},
                    {text: '部署', link: '/zh-CN/howtos/deployment'},
                ],
                sidebar: {
                    '/zh-CN/concepts/': [	
                        {
                            title: '概念',
                            collapsable: false,
                            children: [							
								'about-the-platform',
                                'blockchain-layers',
								'consensus',
								'thesaurus',
                            ],
                        },
						{
                            title: '常见问题',
                            collapsable: false,
                            children: [
                                'faq',
                            ],
                        },
                    ],
                    '/zh-CN/tutorials/': [
                        {
                            title: '教程',
                            collapsable: false,
                            children: [
                                'app_tutorial',
                            ],
                        },
                    ],
                    '/zh-CN/topics/': [
                        {
                            title: '指导',
                            collapsable: false,
                            children: [
								'script',
                                'templates2',
								'vm',
								'daemons',
                            ],
                        },
                    ],
					'/zh-CN/reference/': [
                        {
                            title: '参考',
                            collapsable: false,
                            children: [
                                'api2',
								'platform-parameters',
								'backend-config',
								'desync_monitor',
                            ],
                        },
                    ],
					'/zh-CN/howtos/': [
                        {
                            title: '部署',
                            collapsable: false,
                            children: [
                                'deployment',
                            ]
                        }
                    ],
                    '/zh-CN/': 'auto',
                },
            },
			'/de/': {
				selectText: 'Sprachen',
                label: 'Deutsch',
                ariaLabel: 'Sprache auswählen',
                editLinkText: 'Bearbeiten Sie diese Seite auf GitHub',
                lastUpdated: 'Letzte Aktualisierung',
                nav: [
                    {text: 'Konzept', link: '/de/concepts/about-the-platform',},
                    {text: 'Lernprogramm', link: '/de/tutorials/app_tutorial',},
                    {text: 'Handbuch', link: '/de/topics/script'},
                    {text: 'Referenz', link: '/de/reference/api2',},
                    {text: 'Einsatz', link: '/de/howtos/deployment'},
                ],
                sidebar: {
                    '/de/concepts/': [	
                        {
                            title: 'Konzept',
                            collapsable: false,
                            children: [							
								'about-the-platform',
                                'blockchain-layers',
								'consensus',
								'thesaurus',
                            ],
                        },
						{
                            title: 'Häufiges problem',
                            collapsable: false,
                            children: [
                                'faq',
                            ],
                        },
                    ],
                    '/de/tutorials/': [
                        {
                            title: 'Lernprogramm',
                            collapsable: false,
                            children: [
                                'app_tutorial',
                            ],
                        },
                    ],
                    '/de/topics/': [
                        {
                            title: 'Handbuch',
                            collapsable: false,
                            children: [
                                'templates2',
								'vm',
								'script',
								'daemons',
                            ],
                        },
                    ],
					'/de/reference/': [
                        {
                            title: 'Referenz',
                            collapsable: false,
                            children: [
                                'api2',
								'platform-parameters',
								'backend-config',
								'desync_monitor',
                            ],
                        },
                    ],
					'/de/howtos/': [
                        {
                            title: 'Einsatz',
                            collapsable: false,
                            children: [
                                'deployment',
                            ]
                        }
                    ],
                    '/de/': 'auto',
                },
            },
			'/es/': {
				selectText: 'Idiomas',
                label: 'Español',
                ariaLabel: 'Seleccione el idioma',
                editLinkText: 'Edita esta página en GitHub',
                lastUpdated: 'Última actualización',
                nav: [
                    {text: 'Concepto', link: '/es/concepts/about-the-platform',},
                    {text: 'Tutorial', link: '/es/tutorials/app_tutorial',},
                    {text: 'Guía', link: '/es/topics/script'},
                    {text: 'Referencia', link: '/es/reference/api2',},
                    {text: 'Despliegue', link: '/es/howtos/deployment'},
                ],
                sidebar: {
                    '/es/concepts/': [	
                        {
                            title: 'Concepto',
                            collapsable: false,
                            children: [							
								'about-the-platform',
                                'blockchain-layers',
								'consensus',
								'thesaurus',
                            ],
                        },
						{
                            title: 'Problema comun',
                            collapsable: false,
                            children: [
                                'faq',
                            ],
                        },
                    ],
                    '/es/tutorials/': [
                        {
                            title: 'Tutorial',
                            collapsable: false,
                            children: [
                                'app_tutorial',
                            ],
                        },
                    ],
                    '/es/topics/': [
                        {
                            title: 'Guía',
                            collapsable: false,
                            children: [
								'script',
                                'templates2',
								'vm',
								'daemons',
                            ],
                        },
                    ],
					'/es/reference/': [
                        {
                            title: 'Referencia',
                            collapsable: false,
                            children: [
                                'api2',
								'platform-parameters',
								'backend-config',
								'desync_monitor',
                            ],
                        },
                    ],
					'/es/howtos/': [
                        {
                            title: 'Despliegue',
                            collapsable: false,
                            children: [
                                'deployment',
                            ]
                        }
                    ],
                    '/es/': 'auto',
                },
            },
			'/fr/': {
				selectText: 'Langages',
                label: 'Français',
                ariaLabel: 'Choisir la langue',
                editLinkText: 'Modifier cette page sur GitHub',
                lastUpdated: 'Dernière mise à jour',
                nav: [
                    {text: 'Concept', link: '/fr/concepts/about-the-platform',},
                    {text: 'Didacticiel', link: '/fr/tutorials/app_tutorial',},
                    {text: 'Guider', link: '/fr/topics/script'},
                    {text: 'Référence', link: '/fr/reference/api2',},
                    {text: 'Déploiement', link: '/fr/howtos/deployment'},
                ],
                sidebar: {
                    '/fr/concepts/': [	
                        {
                            title: 'Concept',
                            collapsable: false,
                            children: [							
								'about-the-platform',
                                'blockchain-layers',
								'consensus',
								'thesaurus',
                            ],
                        },
						{
                            title: 'Problème commun',
                            collapsable: false,
                            children: [
                                'faq',
                            ],
                        },
                    ],
                    '/fr/tutorials/': [
                        {
                            title: 'Didacticiel',
                            collapsable: false,
                            children: [
                                'app_tutorial',
                            ],
                        },
                    ],
                    '/fr/topics/': [
                        {
                            title: 'Guider',
                            collapsable: false,
                            children: [
								'script',
                                'templates2',
								'vm',
								'daemons',
                            ],
                        },
                    ],
					'/fr/reference/': [
                        {
                            title: 'Référence',
                            collapsable: false,
                            children: [
                                'api2',
								'platform-parameters',
								'backend-config',
								'desync_monitor',
                            ],
                        },
                    ],
					'/fr/howtos/': [
                        {
                            title: 'Déploiement',
                            collapsable: false,
                            children: [
                                'deployment',
                            ]
                        }
                    ],
                    '/fr/': 'auto',
                },
            },
			'/ja/': {
				selectText: '言語',
                label: '日本語',
                ariaLabel: '言語を選択する',
                editLinkText: 'GitHubでこのページを編集する',
                lastUpdated: '最終更新',
                nav: [
                    {text: 'コンセプト', link: '/ja/concepts/about-the-platform',},
                    {text: 'チュートリアル', link: '/ja/tutorials/app_tutorial',},
                    {text: 'ガイド', link: '/ja/topics/script'},
                    {text: 'リファレンス', link: '/ja/reference/api2',},
                    {text: '展開', link: '/ja/howtos/deployment'},
                ],
                sidebar: {
                    '/ja/concepts/': [	
                        {
                            title: 'コンセプト',
                            collapsable: false,
                            children: [							
								'about-the-platform',
                                'blockchain-layers',
								'consensus',
								'thesaurus',
                            ],
                        },
						{
                            title: '一般的な問題',
                            collapsable: false,
                            children: [
                                'faq',
                            ],
                        },
                    ],
                    '/ja/tutorials/': [
                        {
                            title: 'チュートリアル',
                            collapsable: false,
                            children: [
                                'app_tutorial',
                            ],
                        },
                    ],
                    '/ja/topics/': [
                        {
                            title: 'ガイド',
                            collapsable: false,
                            children: [
								'script',
                                'templates2',
								'vm',
								'daemons',
                            ],
                        },
                    ],
					'/ja/reference/': [
                        {
                            title: 'リファレンス',
                            collapsable: false,
                            children: [
                                'api2',
								'platform-parameters',
								'backend-config',
								'desync_monitor',
                            ],
                        },
                    ],
					'/ja/howtos/': [
                        {
                            title: '展開',
                            collapsable: false,
                            children: [
                                'deployment',
                            ]
                        }
                    ],
                    '/ja/': 'auto',
                },
            },
			'/it/': {
				selectText: 'Le lingue',
                label: 'Italiano',
                ariaLabel: 'Seleziona la lingua',
                editLinkText: 'Modifica questa pagina su GitHub',
                lastUpdated: 'Ultimo aggiornamento',
                nav: [
                    {text: 'Concetto', link: '/it/concepts/about-the-platform',},
                    {text: 'Tutorial', link: '/it/tutorials/app_tutorial',},
                    {text: 'Guida', link: '/it/topics/script'},
                    {text: 'Riferimento', link: '/it/reference/api2',},
                    {text: 'Distribuzione', link: '/it/howtos/deployment'},
                ],
                sidebar: {
                    '/it/concepts/': [	
                        {
                            title: 'Concetto',
                            collapsable: false,
                            children: [							
								'about-the-platform',
                                'blockchain-layers',
								'consensus',
								'thesaurus',
                            ],
                        },
						{
                            title: 'Problema comune',
                            collapsable: false,
                            children: [
                                'faq',
                            ],
                        },
                    ],
                    '/it/tutorials/': [
                        {
                            title: 'Tutorial',
                            collapsable: false,
                            children: [
                                'app_tutorial',
                            ],
                        },
                    ],
                    '/it/topics/': [
                        {
                            title: 'Guida',
                            collapsable: false,
                            children: [
								'script',
                                'templates2',
								'vm',
								'daemons',
                            ],
                        },
                    ],
					'/it/reference/': [
                        {
                            title: 'Riferimento',
                            collapsable: false,
                            children: [
                                'api2',
								'platform-parameters',
								'backend-config',
								'desync_monitor',
                            ],
                        },
                    ],
					'/it/howtos/': [
                        {
                            title: 'Distribuzione',
                            collapsable: false,
                            children: [
                                'deployment',
                            ]
                        }
                    ],
                    '/it/': 'auto',
                },
            },
			'/tr-TR/': {
				selectText: 'Bir dil seçin',
                label: 'Türkçe',
                ariaLabel: 'Bir dil seçin',
                editLinkText: 'Bu sayfayı GitHub da düzenleyin',
                lastUpdated: 'son Güncelleme',
                contributorsLabel: 'katkıda bulunan',
                nav: [
                    {text: 'Genel Bakış', link: '/tr-TR/concepts/about-the-platform',},
                    {text: 'öğretici', link: '/tr-TR/tutorials/app_tutorial',},
                    {text: 'kılavuz', link: '/tr-TR/topics/script'},
                    {text: 'başvurmak', link: '/tr-TR/reference/api2',},
                    {text: 'dağıtmak', link: '/tr-TR/howtos/deployment'},
                ],
                sidebar: {
                    '/tr-TR/concepts/': [	
                        {
                            title: 'Genel Bakış',
                            collapsable: false,
                            children: [							
								'about-the-platform',
                                'blockchain-layers',
								'consensus',
								'thesaurus',
                            ],
                        },
						{
                            title: 'SSS',
                            collapsable: false,
                            children: [
                                'faq',
                            ],
                        },
                    ],
                    '/tr-TR/tutorials/': [
                        {
                            title: 'öğretici',
                            collapsable: false,
                            children: [
                                'app_tutorial',
                            ],
                        },
                    ],
                    '/tr-TR/topics/': [
                        {
                            title: 'kılavuz',
                            collapsable: false,
                            children: [
								'script',
                                'templates2',
								'vm',
								'daemons',
                            ],
                        },
                    ],
					'/tr-TR/reference/': [
                        {
                            title: 'başvurmak',
                            collapsable: false,
                            children: [
                                'api2',
								'platform-parameters',
								'backend-config',
								'desync_monitor',
                            ],
                        },
                    ],
					'/tr-TR/howtos/': [
                        {
                            title: 'dağıtmak',
                            collapsable: false,
                            children: [
                                'deployment',
                            ]
                        }
                    ],
                    '/tr-TR/': 'auto',
                },
            },
        },
    },
}
