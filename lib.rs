use anchor_lang::prelude::*;

declare_id!("DEX111111111111111111111111111111111111111");

#[program]
pub mod aetherswap {
    use super::*;

    pub fn initialize(_ctx: Context<Initialize>) -> Result<()> {
        msg!("AetherSwap Initialized");
        Ok(())
    }

    pub fn swap(_ctx: Context<Swap>, amount_in: u64) -> Result<()> {
        msg!("Swapping {} tokens", amount_in);
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize {}

#[derive(Accounts)]
pub struct Swap<'info> {
    #[account(mut)]
    pub user: Signer<'info>,
}
