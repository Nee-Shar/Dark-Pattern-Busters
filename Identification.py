import pandas as pd 

#First we check different count of types of Pattern Cateogry

df=pd.read_csv('dataset.tsv',delimiter='\t',encoding='utf-8')

df=df[pd.notnull(df['text'])]

# Count different types of pattern categories and number of strings in each category
pattern_counts = df['Pattern Category'].value_counts()
print(pattern_counts)
