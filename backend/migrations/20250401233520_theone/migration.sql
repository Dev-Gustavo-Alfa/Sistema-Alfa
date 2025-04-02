-- CreateTable
CREATE TABLE `indicacao` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `data_captacao` VARCHAR(191) NOT NULL,
    `data_ultima_vista` VARCHAR(191) NOT NULL,
    `processo` VARCHAR(191) NOT NULL,
    `estado` VARCHAR(191) NOT NULL,
    `nomenclatura_captada` VARCHAR(191) NOT NULL,
    `vara` VARCHAR(191) NOT NULL,
    `foro` VARCHAR(191) NOT NULL,
    `juizo` VARCHAR(191) NOT NULL,
    `situacao` VARCHAR(191) NOT NULL,
    `valor_acao_adv_conc` VARCHAR(191) NOT NULL,
    `tipo_captacao` VARCHAR(191) NOT NULL,
    `advogado_escritorio` VARCHAR(191) NOT NULL,
    `contato` VARCHAR(191) NOT NULL,
    `cidade` VARCHAR(191) NOT NULL,
    `bairro` VARCHAR(191) NOT NULL,
    `analise_viabilidade` VARCHAR(191) NOT NULL,
    `observacoes_captador` VARCHAR(191) NOT NULL,
    `relatorio` VARCHAR(191) NOT NULL,
    `observacoes_manutencao` VARCHAR(191) NOT NULL,
    `responsavel` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `captacao` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `data_captacao` VARCHAR(191) NOT NULL,
    `processo` VARCHAR(191) NOT NULL,
    `termo_busca` VARCHAR(191) NOT NULL,
    `tipo_captacao` VARCHAR(191) NOT NULL,
    `exequente` VARCHAR(191) NOT NULL,
    `adv_exequente_escritorio` VARCHAR(191) NOT NULL,
    `responsavel` VARCHAR(191) NOT NULL,
    `contato` VARCHAR(191) NOT NULL,
    `observacoes` VARCHAR(191) NOT NULL,
    `ligacao_frutifera` VARCHAR(191) NOT NULL,
    `num_imoveis` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
