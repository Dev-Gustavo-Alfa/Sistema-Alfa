-- AlterTable
ALTER TABLE `indicacao` MODIFY `data_ultima_vista` VARCHAR(191) NULL;

-- CreateTable
CREATE TABLE `captacao_geral` (
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
