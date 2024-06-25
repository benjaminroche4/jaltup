<?php

namespace App\Service;

use Psr\Log\LoggerInterface;
use Symfony\Bridge\Twig\Mime\TemplatedEmail;
use Symfony\Component\Mailer\Exception\TransportExceptionInterface;
use Symfony\Component\Mailer\MailerInterface;

/**
 * The mailer service
 */
readonly class MailerService
{
    /**
     * The constructor
     *
     * @param MailerInterface $mailer
     * @param LoggerInterface $logger
     */
    public function __construct(
        private MailerInterface $mailer,
        private LoggerInterface $logger,
    ) {}

    /**
     * Send an email
     *
     * @param string $to
     * @param string $subject
     * @param string $htmlTemplate
     * @param array $context
     */
    public function sendEmail(
        string $to,
        string $subject,
        string $htmlTemplate,
        array $context): void
    {
        $email = (new TemplatedEmail())
            ->from( 'no-reply@jaltup.com')
            ->to($to)
            ->subject($subject)
            ->htmlTemplate($htmlTemplate)
            ->context($context);

        try {
            $this->mailer->send($email);
        } catch (TransportExceptionInterface $e) {
            $this->logger->error('Failed to send email :'. $e->getMessage());
        }
    }
}