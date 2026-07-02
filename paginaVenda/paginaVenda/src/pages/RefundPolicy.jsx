import LegalLayout from '@/components/LegalLayout';

const RefundPolicy = () => (
  <LegalLayout title="Política de Reembolso" description="Como solicitar cancelamento, devolução ou análise de reembolso na CineStream." path="/reembolso">
    <section><h2>1. Como solicitar</h2><p>Envie o número do pedido, nome usado na compra, motivo da solicitação e evidências relevantes pelo WhatsApp. Nunca envie senha ou número completo de cartão.</p></section>
    <section><h2>2. Serviços e acessos digitais</h2><p>Pedidos de cancelamento ou reembolso serão analisados conforme a legislação aplicável, a data da contratação, a ativação do acesso e as condições exibidas no checkout. A resposta informará os próximos passos e eventual prazo da operadora de pagamento.</p></section>
    <section><h2>3. Produtos físicos</h2><p>Em caso de defeito, avaria, item incorreto ou intenção de devolução, entre em contato antes de enviar o produto. Preserve embalagem, acessórios e comprovantes. A equipe fornecerá as instruções de postagem quando cabível.</p></section>
    <section><h2>4. Prazo de processamento</h2><p>Após a aprovação, o estorno é solicitado ao meio de pagamento original. O prazo de exibição do crédito depende do banco, bandeira ou plataforma utilizada.</p></section>
    <section><h2>5. Atendimento</h2><p>Solicite a análise pelo WhatsApp <a href="https://wa.me/5543999748808?text=Olá!%20Preciso%20de%20ajuda%20com%20cancelamento%20ou%20reembolso." target="_blank" rel="noopener noreferrer">(43) 99974-8808</a>.</p></section>
  </LegalLayout>
);

export default RefundPolicy;
