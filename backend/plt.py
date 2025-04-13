import matplotlib.pyplot as plt                                                                                                                               
                                                                                                                                                            
coins = ['horse', 'OG BABYFACE']                                                                                                                              
market_caps = [300807.67, 35712.03]                                                                                                                           
volumes = [13467.51, 18798.05]                                                                                                                                
                                                                                                                                                            
fig, ax1 = plt.subplots()                                                                                                                                     
                                                                                                                                                            
ax1.set_title('Comparison of Zora Coins')                                                                                                                     
ax1.set_xlabel('Coins')                                                                                                                                       
ax1.set_ylabel('Market Cap', color='tab:blue')                                                                                                                
ax1.bar(coins, market_caps, color='tab:blue', alpha=0.6, label='Market Cap')                                                                                  
ax1.tick_params(axis='y', labelcolor='tab:blue')                                                                                                              
                                                                                                                                                            
ax2 = ax1.twinx()                                                                                                                                             
ax2.set_ylabel('Volume 24h', color='tab:green')                                                                                                               
ax2.bar(coins, volumes, color='tab:green', alpha=0.3, label='Volume')                                                                                         
ax2.tick_params(axis='y', labelcolor='tab:green')                                                                                                             
                                                                                                                                                            
fig.tight_layout()                                                                                                                                            
plt.savefig('zora_coins_comparison.png')   