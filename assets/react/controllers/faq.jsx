import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react'
import { MinusSmallIcon, PlusSmallIcon } from '@heroicons/react/24/outline'
import React from 'react'

const faqs = [
    {
        question: "Est-ce que je peux me désabonner à tout moment ?",
        answer:
            "Oui, vous pouvez vous désabonner à tout moment. Notre service est conçu pour offrir une flexibilité maximale à nos utilisateurs. Pour vous désabonner, il vous suffit de nous envoyer un email à contact@jaltup.com.",
    },
    {
        question: "Une fois abonné, comment cela se passe ?\n",
        answer:
            "Une fois votre paiement validé, vous aurez accès directement à tous nos services sans délai d'attente.",
    },
    {
        question: "J'ai un problème, comment faire ?\n",
        answer:
            "Pour toute assistance, veuillez nous contacter par e-mail à contact@jaltup.com.",
    },
]

export default function FAQ() {
    return (
        <div className="bg-white">
            <div className="mx-auto max-w-7xl px-6 pb-24 lg:px-8">
                <div className="mx-auto max-w-4xl divide-y divide-gray-900/10">
                    <h2 className="text-2xl font-bold leading-10 tracking-tight text-gray-900">Questions/réponses</h2>
                    <dl className="mt-10 space-y-6 divide-y divide-gray-900/10">
                        {faqs.map((faq) => (
                            <Disclosure key={faq.question} as="div" className="pt-6">
                                <dt>
                                    <DisclosureButton className="group flex w-full items-start justify-between text-left text-gray-900">
                                        <span className="text-base font-semibold leading-7">{faq.question}</span>
                                        <span className="ml-6 flex h-7 items-center">
                      <PlusSmallIcon aria-hidden="true" className="h-6 w-6 group-data-[open]:hidden" />
                      <MinusSmallIcon aria-hidden="true" className="h-6 w-6 [.group:not([data-open])_&]:hidden" />
                    </span>
                                    </DisclosureButton>
                                </dt>
                                <DisclosurePanel as="dd" className="mt-2 pr-12">
                                    <p className="text-base leading-7 text-gray-600">{faq.answer}</p>
                                </DisclosurePanel>
                            </Disclosure>
                        ))}
                    </dl>
                </div>
            </div>
        </div>
    )
}
