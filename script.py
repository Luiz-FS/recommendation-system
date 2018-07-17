from surprise import SVD
from surprise import Dataset, KNNBasic
from surprise.model_selection import cross_validate

# Load the movielens-100k dataset (download it if needed).
data = Dataset.load_builtin('ml-100k')

# # Use the famous SVD algorithm.
# algo = SVD()

# # Run 5-fold cross-validation and print results.
# cross_validate(algo, data, measures=['RMSE', 'MAE'], cv=5, verbose=True)
train = data.build_full_trainset()
algo = KNNBasic(k=4, min_k=2, verbose=True)
import pdb
pdb.set_trace()
algo.fit(train)

uid = '10'

pred = algo.predict(uid=uid, iid="", r_ui=0, verbose=True)

print(pred)